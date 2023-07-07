import axios, { AxiosRequestConfig } from 'axios';

export default async function getNFTMetadata(address: string): Promise<void> {
    
    const options: AxiosRequestConfig = {
        method: 'GET',
        url: `https://api.nftport.xyz/v0/accounts/${address}`,
        params: {
            chain: 'ethereum',
            page_size: '50',
            include: 'default',
            contract_address: '0x853806fCa5Ee8a6Ac99Dc84a8e3596A4F6541796'
        },
        headers: {
            accept: 'application/json',
            Authorization: '56d9ea2e-8523-4b9b-bc1d-c0a14eea3469'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Example usage
//const connectedAddress = '0x69254608f6349b6A6EefF53C1ab3c009699514Ea';
//getNFTMetadata(connectedAddress);
