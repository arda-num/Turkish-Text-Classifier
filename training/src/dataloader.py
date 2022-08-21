import torch
from torch.utils.data import Dataset
#from transformers import BertTokenizer
from transformers import AutoTokenizer
import pandas as pd
import numpy as np

labels={
    'bilim_teknoloji': 0,
    'dunya': 1,
    'egitim': 2,
    'ekonomi': 3,
    'kultur_sanat' : 4,
    'saglik' : 5,
    'spor' : 6}


class SSTDataset(Dataset):

    def __init__(self, filename, maxlen):

        #Store the contents of the file in a pandas dataframe
        self.df = pd.read_csv(filename)
        self.labels = [labels[label] for label in self.df['category']]
        #Initialize the BERT tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained('dbmdz/bert-base-turkish-cased')

        self.maxlen = maxlen

    def __len__(self):
        return len(self.df)

    def get_batch_labels(self, idx):
        # Fetch a batch of labels
        return np.array(self.labels[idx])

    def __getitem__(self, index):

        #Selecting the sentence and label at the specified index in the data frame
        sentence = self.df.loc[index, 'content']
        label = self.get_batch_labels(index)

        #Preprocessing the text to be suitable for BERT
        
        encoding = self.tokenizer.encode_plus(
            sentence,
            add_special_tokens=True,
            max_length=self.maxlen,
            return_token_type_ids=False,
            padding="max_length",
            return_attention_mask=True,
            truncation=True,
            return_tensors='pt',
        )
        tokens_ids_tensor = encoding['input_ids'].flatten()
        attn_mask = encoding['attention_mask'].flatten()

        #Obtaining the attention mask i.e a tensor containing 1s for no padded tokens and 0s for padded ones
        attn_mask = (tokens_ids_tensor != 0).long()
        return tokens_ids_tensor, attn_mask, label




