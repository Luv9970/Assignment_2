export function simulateUpdates(dispatch, getState) {
    setInterval(() => {
      const { assets } = getState().crypto;
      const updatedAssets = assets.map(asset => ({
        ...asset,
        price: (asset.price * (1 + (Math.random() - 0.5) / 100)).toFixed(2),
        percentChange1h: (Math.random() * 10 - 5).toFixed(2),
        percentChange24h: (Math.random() * 10 - 5).toFixed(2),
        volume24h: (asset.volume24h * (1 + (Math.random() - 0.5) / 10)).toFixed(2)
      }));
      updatedAssets.forEach(asset => {
        dispatch(updateAsset(asset));
      });
    }, 1500);
  }
  