import torch
import torch.nn as nn

labels={
    0:'dunya ',
    1:'ekonomi ',
    2:'kultur ',
    3:'saglik ',
    4:'siyaset ' ,
    5:'spor ' ,
    6:'teknoloji ' }



def tokenize_and_calculate(sentence,model,tokenizer):


    #Preprocessing the text to be suitable for BERT
    
    model.eval()

    encoding = tokenizer.encode_plus(
        sentence,
        add_special_tokens=True,
        max_length=512,
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
    attn_mask = attn_mask.unsqueeze(0)
    tokens_ids_tensor = tokens_ids_tensor.unsqueeze(0)

    logits = model(tokens_ids_tensor, attn_mask)
    
    probabilities = nn.functional.softmax(logits)[0].tolist()
    prediction = labels[int(logits.argmax(dim=1)[0])]

    return prediction, probabilities


