Vue.createApp({
    data() {
        return {
            path: 'wern',
            products: [],
            nowProduct: {
                // imagesUrl: [],
            },
            isAddPproduct: true,
            imgPath: "",

        }
    },
    methods: {
        checkadmin() {  // 驗證使用者是否有登入(有登入取得商品資訊，沒有則返回登入頁面)
            const api = 'https://vue3-course-api.hexschool.io/v2/api/user/check';
            axios.post(api).then((res) => {
                this.getProductsData()
            }).catch((err) => {
                window.location = 'login.html';
            })

        },
        getProductsData() {
            const api = `https://vue3-course-api.hexschool.io/v2/api/${this.path}/admin/products`;
            axios.get(api).then((res) => {
                this.products = res.data.products;
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        openModel(status, item) {
            if (status === 'add') {
                this.isAddPproduct = true
                this.nowProduct = {

                }
                productModal.show();
            } else if (status === 'del') {
                this.nowProduct = item
                delProductModal.show();
            } else if (status === 'edit') {
                this.isAddPproduct = false
                this.nowProduct = { ...item }
                productModal.show();
            }
        },
        upProductData() {
            const api = `https://vue3-course-api.hexschool.io/v2/api/${this.path}/admin/product`;

            if (this.isAddPproduct === true) {
                axios.post(api, { "data": this.nowProduct }).then((res) => {
                    this.nowProduct = {}
                    productModal.hide();
                    this.getProductsData();
                })
            } else if (this.isAddPproduct === false) {
                axios.put(`${api}/${this.nowProduct.id}`, { "data": this.nowProduct }).then((res) => {
                    this.nowProduct = {}
                    productModal.hide();
                    this.getProductsData();
                })
            }

        },
        delProduct() {
            const api = `https://vue3-course-api.hexschool.io/v2/api/${this.path}/admin/product/${this.nowProduct.id}`;
            axios.delete(api).then((res) => {
                this.nowProduct = {}
                this.getProductsData();
                delProductModal.hide();
                alert(res.data.message)
            })
        },
        delImagesUrl() {
            // 刪除陣列最後一項
            this.nowProduct.imagesUrl.pop();
        },
        addMainImg() {
            this.nowProduct.imagesUrl = [];
            this.nowProduct.imagesUrl.push('');
        },
        addImg() {
            this.nowProduct.imagesUrl.push('')
        },
        uploadImg(e) {
            const api = `https://vue3-course-api.hexschool.io/v2/api/${this.path}/admin/upload`;
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file-to-upload', file);
            axios.post(api, formData)
                .then((res) => {
                    console.log(res.data.imageUrl);
                    this.imgPath = res.data.imageUrl
                })

        },

    },
    mounted() {
        // 取出 Token(google取得)
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        // 將token放入headers,只需發送一次(google取得)
        axios.defaults.headers.common.Authorization = token;
        this.checkadmin()

        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });
    },
}).mount('#app')

