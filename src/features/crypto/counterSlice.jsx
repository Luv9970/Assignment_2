import { createSlice } from '@reduxjs/toolkit'
import { sampledata } from '../../utils/sampledata'

const initialState = {
  assets : sampledata,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAssets(state, action) {
      state.assets = action.payload;
    },

     updateAsset(state, action) {
      const updated = action.payload;
      const index = state.assets.findIndex(a => a.symbol === updated.symbol);
      if (index !== -1) {
        state.assets[index] = { ...state.assets[index], ...updated };
      }
    },

    simulateLiveUpdate(state) {
      state.assets = state.assets.map(asset => {
        const randomChange = () => (Math.random() * 2 - 1).toFixed(2); 

        const priceFloat = parseFloat(asset.price);
        const newPrice = (priceFloat * (1 + randomChange() / 100)).toFixed(2);

        const volume24h = parseFloat(asset.volume24h)
        const newvolume24h = ( volume24h  + (randomChange() / 10)).toFixed(2)

        return {
          ...asset,
          price: parseFloat(newPrice),
          change1h: parseFloat(randomChange()),
          change24h: parseFloat(randomChange()),
          change7d: parseFloat(randomChange()),
          volume24h: parseFloat(newvolume24h),
        };
      });
    },

  },
})

export const { setAssets, updateAsset, simulateLiveUpdate } = counterSlice.actions
export default counterSlice.reducer