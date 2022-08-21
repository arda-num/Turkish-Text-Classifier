import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
import argparse
import time
from src.model import SentimentClassifier
from src.dataloader import SSTDataset


def evaluate(net, criterion, dataloader, args):
    net.eval()

    mean_loss = 0, 0
    count = 0
    total_acc = 0
    with torch.no_grad():
        for seq, attn_masks, labels in dataloader:
            seq, attn_masks, labels = seq.cuda(args.gpu), attn_masks.cuda(args.gpu), labels.cuda(args.gpu)
            logits = net(seq, attn_masks)
            acc = (logits.argmax(dim=1) == labels).sum().item()
            total_acc += acc
            count += 1

    return total_acc / count 



def train(net, criterion, opti, train_loader, val_loader, args):
    best_acc = 0
    for ep in range(args.max_eps):
        total_acc_train = 0
        for it, (seq, attn_masks, labels) in enumerate(train_loader):
            
            #Clear gradients
            opti.zero_grad()  
            #Converting these to cuda tensors
            seq, attn_masks, labels = seq.cuda(args.gpu), attn_masks.cuda(args.gpu), labels.cuda(args.gpu)

            #Obtaining the logits from the model
            logits = net(seq, attn_masks)
            #Computing loss
            loss = criterion(logits, labels)

            #Backpropagating the gradients
            loss.backward()

            #Optimization step
            opti.step()
            acc = (logits.argmax(dim=1) == labels).sum().item()
            total_acc_train += acc
            if it % args.print_every == 0:
                
                print("Iteration {} of epoch {} complete. Loss : {} Accuracy : {}".format(it, ep, loss.item(), total_acc_train/(it+1)))

        
        val_acc = evaluate(net, criterion, val_loader, args)
        print("Epoch {} complete! Validation Accuracy : {}".format(ep, val_acc))
        if val_acc > best_acc:
            print("Best validation accuracy improved from {} to {}, saving model...".format(best_acc, val_acc))
            best_acc = val_acc
            # torch.save(net.state_dict(), 'Models/sstcls_{}_freeze_{}.dat'.format(ep, args.freeze_bert))
            torch.save(net.state_dict(), "/content/training/model.pt")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-gpu', type = int, default = 0)
    parser.add_argument('-freeze_bert', default=True)
    parser.add_argument('-maxlen', type = int, default= 512)
    parser.add_argument('-batch_size', type = int, default= 1)
    parser.add_argument('-lr', type = float, default = 2e-5)
    parser.add_argument('-print_every', type = int, default= 1)
    parser.add_argument('-max_eps', type = int, default= 10)
    args = parser.parse_args()

    #Instantiating the classifier model
    print("Building model!")
    st = time.time()
    net = SentimentClassifier(args.freeze_bert)
    net.cuda(args.gpu) #Enable gpu support for the model
    print("Done in {} seconds".format(time.time() - st))

    print("Creating criterion and optimizer objects")
    st = time.time()
    criterion = nn.CrossEntropyLoss()
    opti = optim.Adam(net.parameters(), lr = args.lr)
    print("Done in {} seconds".format(time.time() - st))

    #Creating dataloaders
    print("Creating train and val dataloaders")
    st = time.time()
    train_set = SSTDataset(filename = '/content/training/data/train/train.csv', maxlen = args.maxlen)
    val_set = SSTDataset(filename = '/content/training/data/test/test.csv', maxlen = args.maxlen)
    train_loader = DataLoader(train_set, batch_size = args.batch_size, num_workers = 5)
    val_loader = DataLoader(val_set, batch_size = args.batch_size, num_workers = 5)
    print("Done in {} seconds".format(time.time() - st))
    
    print("Let the training begin")
    st = time.time()
    train(net, criterion, opti, train_loader, val_loader, args)
    print("Done in {} seconds".format(time.time() - st))



