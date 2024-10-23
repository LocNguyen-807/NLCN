<script setup>
    const search = defineModel({
        type: String,
        default: '',
    });

    const isLoggedIn = defineProps({
        isLoggedIn: {
            type: Boolean,
            default: false
        }
    });

    const cartItemCount = ref(0);
</script>

<template>
  <nav class="navbar navbar-expand bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
        <a 
            href="/">
            <img src="../../public/img/logo.png" alt="logo" width="30" height="24">
        </a>
        <div class="input-group w-25">
            <input
             type="text"
             class="form-control"
             placeholder="Tìm kiếm..."
             v-model="search"
             >
             <button 
             class="btn btn-outline-light" 
             type="button"
             @click="$emit('search')">
                <i class="bi bi-search"></i>
             </button>
        </div>
        <div class="me-auto navbar-nav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link 
                    :to="{ name: 'keyboard' }"
                    class="nav-link">
                        Bàn phím
                    </router-link>
                </li>
                
                <li class="nav-item">
                    <router-link 
                    :to="{ name: 'headphone' }"
                    class="nav-link">
                        Tai nghe
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link 
                    :to="{ name: 'mouse' }"
                    class="nav-link">
                        Chuột
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link 
                    :to="{ name: 'others' }"
                    class="nav-link">
                        Khác
                    </router-link>
                </li>
            </ul>
            

            <div class="d-flex align-items-center">
                    <template v-if="!isLoggedIn">
                        <router-link to="/login" class="btn btn-danger me-2">Đăng nhập</router-link>
                        <router-link to="/register" class="btn btn-danger">Đăng ký</router-link>
                    </template>
                    <template v-else>
                        <button class="btn btn-danger" @click="logout">Đăng xuất</button>
                    </template>
                    
                    <router-link to="/cart" class="btn btn-link text-white ms-3 position-relative">
                    <i class="bi bi-cart3 fs-5"></i>
                    <span v-if="cartItemCount" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {{ cartItemCount }}
                    </span>
                    </router-link>
            </div>
        </div>
    </div>
  </nav>
</template>

<style scoped>
    .navbar {
    padding: 0.5rem 2rem;
    }

    .nav-link {
    color: white;
    font-weight: 500;
    padding: 0.5rem 1rem;
    }

    .nav-link:hover {
    color: #dc3545;
    }


