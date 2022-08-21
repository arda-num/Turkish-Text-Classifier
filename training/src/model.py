import torch
import torch.nn as nn
#from transformers import BertModel
from transformers import AutoModel, AutoTokenizer

class SentimentClassifier(nn.Module):

    def __init__(self, freeze_bert = True):
        super(SentimentClassifier, self).__init__()
        #Instantiating BERT model object 
        self.bert_layer = AutoModel.from_pretrained('dbmdz/bert-base-turkish-cased')
        #Freeze bert layers
        if freeze_bert:
            for (name,p) in self.bert_layer.named_parameters():
                if name == "encoder.layer.10.attention.self.query.weight":
                    break
                p.requires_grad = False
            
        
        self.hidden_size = self.bert_layer.config.hidden_size
        self.dropout = nn.Dropout(0.3)
        self.relu = nn.ReLU()
        #Classification layer
        self.cls_layer = nn.Linear(self.hidden_size, 7)

    def forward(self, seq, attn_masks):
        '''
        Inputs:
            -seq : Tensor of shape [B, T] containing token ids of sequences
            -attn_masks : Tensor of shape [B, T] containing attention masks to be used to avoid contibution of PAD tokens
        '''
        #Feeding the input to BERT model to obtain contextualized representations
        output = self.bert_layer(seq, attention_mask = attn_masks)
        #Obtaining the representation of [CLS] head
        cont_reps = output[1] #We only need the second output, since we are doing classification!

        drop_out = self.dropout(cont_reps)
        out_linear = self.cls_layer(drop_out)

        #Feeding cls_rep to the classifier layer
        logits = self.relu(out_linear)

        return logits


