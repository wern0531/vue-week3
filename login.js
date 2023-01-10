Vue.createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios.post(api, this.user)
                .then((res) => {
                    // 從res.data內取得token,expired(時間格式)
                    const { token, expired } = res.data;
                    // 存放cookie
                    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                    window.location = 'products.html';
                }).catch((err) => {
                    alert(err.response.data.message);
                });


        }
    },
    mounted() {

    },
}).mount('#app');




// Vue.createApp({
//     data() {
//         return {
//             user: {
//                 username: '',
//                 password: '',
//             },
//         }
//     },
//     methods: {
//         login() {
//             const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
//             axios.post(api, this.user).then((response) => {
//                 const { token, expired } = response.data;
//                 寫入 cookie token
//                 expires 設置有效時間
//                 document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
//                 window.location = 'products.html';
//             }).catch((err) => {
//                 console.log(this.user);
//                 alert(err.response.data.message);
//             });
//         },
//     },
// }).mount('#app');