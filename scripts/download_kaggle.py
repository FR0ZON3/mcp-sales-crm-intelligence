import os
from kaggle.api.kaggle_api_extended import KaggleApi

def download_dataset(owner_slug, dataset, dest='data'):
    api = KaggleApi()
    api.authenticate()
    os.makedirs(dest, exist_ok=True)
    print(f'Downloading {owner_slug}/{dataset} into {dest}...')
    api.dataset_download_files(f'{owner_slug}/{dataset}', path=dest, unzip=True, quiet=False)
    print('Done.')

if __name__ == '__main__':
    # kyanyoga/sample-sales-data
    download_dataset('kyanyoga','sample-sales-data','data')
