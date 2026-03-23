import requests


def fetch_clinical_trials(query):
    url = 'https://clinicaltrials.gov/api/query/full_studies?query=' + query
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f'Error fetching data: {response.status_code}')

if __name__ == '__main__':
    trials = fetch_clinical_trials('vasculitis')
    print(trials)