import { groupBy } from "lodash"
import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
        }
    },
    actions: {
        addToCart(count, product) {
            count = parseInt(count)
            this.$patch(state => {
                for (let index = 0; index < count; index++) {
                    state.items.push({ ...product });
                }
            })


        }
    },
    getters: {
        count: (state) => state.items.length,

        isEmpty: (state) => state.count === 0,
        grouped: state => groupBy(state.items, item => item.name)

    }
})