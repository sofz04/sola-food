document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const resp = await window.solana.connect();
            document.getElementById('walletAddress').textContent = `Wallet: ${resp.publicKey.toString()}`;
        } catch (err) {
            console.error('Wallet connection error:', err);
        }
    } else {
        alert('Phantom Wallet not installed');
    }
});

document.getElementById('getBalance').addEventListener('click', async () => {
    const walletAddress = document.getElementById('walletAddress').textContent.split(' ')[1];
    if (!walletAddress) {
        alert('Please connect your wallet first!');
        return;
    }

    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
    const publicKey = new solanaWeb3.PublicKey(walletAddress);
    const tokenMintAddress = new solanaWeb3.PublicKey('<YOUR_TOKEN_MINT_ADDRESS>');

    const tokenAccountInfo = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: tokenMintAddress });
    const balance = tokenAccountInfo.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount || 0;

    document.getElementById('balance').textContent = `Token Balance: ${balance}`;
});
