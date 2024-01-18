import { groupBy } from "lodash"
import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
        }
    },
    actions: {
        addToCart(count, item) {
            count = parseInt(count)
            this.$patch(state => {
                for (let index = 0; index < count; index++) {
                    state.items.push({ ...item });
                }
            })
        },
        clearItem(name) {
            this.$patch((state) => {
                state.items = state.items.filter((item) => item.name !== name);
            });
        },
        setItemCount(item, count) {
            this.clearItem(item.name)
            this.addToCart(count, item);
        }
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: state => groupBy(state.items, item => item.name),
        groupCount: (state) => (name) => state.grouped[name].length,
        total() {
            return this.items.reduce((total, items) => total + (items.price || 0), 0)
        },

    }
})