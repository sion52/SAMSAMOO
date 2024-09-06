import pandas as pd
import torch
from kobert_transformers import get_kobert_model
from tokenization_kobert import KoBertTokenizer
from torch.nn.functional import cosine_similarity

model = get_kobert_model()
tokenizer = KoBertTokenizer.from_pretrained('monologg/kobert')


def get_vector(text):
    tokens = tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=512)
    outputs = model(**tokens)
    if outputs.last_hidden_state.size(1) > 0:
        cls_embedding = outputs.last_hidden_state[:, 0, :]
        return cls_embedding
    else:
        print("Error: No output from model")
        return None


def recommend_companies(user_input, df):
    user_input_vector = get_vector(user_input)

    scores = []
    for index, row in df.iterrows():
        combined_info = row['company_short_data']
        combined_info_vector = get_vector(combined_info)
        sim_score_tensor = (1 + cosine_similarity(user_input_vector, combined_info_vector)) / 2 * 100
        sim_score = sim_score_tensor.item()
        scores.append((index, sim_score))

    scores = sorted(scores, key=lambda x: x[1], reverse=True)
    recommendations = [(df['company_name'].iloc[i[0]], i[1]) for i in scores[:4]]

    return recommendations


if __name__ == "__main__":

    df = pd.read_csv('data.csv')

    user_input = input("키워드나 조건을 입력하세요: ")
    recommendations = recommend_companies(user_input, df)

    backend_data = []

    for company_name, score in recommendations:
        backend_data.append({
            'company_name': company_name,
            'similarity_score': score
        })

    print(backend_data)