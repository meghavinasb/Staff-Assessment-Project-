import { defineStore } from "pinia";

export const useSharedStore = defineStore('sharedStore', {
    state: () => ({
        authenticated: false,
        userRole: 'guest',
        data: {
            user: {
                id: '',
                name: '',
                registerNumber: '',
                department: '',
                year: '',
                batch: '',
            }
        }
    }),
    actions: {
        async checkIfAuthenticated () {
            // API hit or Check if cookie or session data is available
            this.userRole = 'student';
            this.data.user = {
                id: '1',
                name: 'Jerusha Singh',
                registerNumber: '12314',
                department: 'AI & DS',
                year: '3rd Year',
                batch: '2022-2026'
            }
            return false;
        }
    }
})