<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex">
                <button class="btn complete p-0" @click="changeTaskStatus">
                    <i class="icon fa-regular fa-circle-check"></i>
                </button>
                <div class="mx-4 test">
                    <p class="m-0 align-left fw-bold" :class="{ 'is-completed': task.isCompleted }">{{ task.title }}</p> 
                    </div>
                <button class="btn delete p-0" @click="$emit('delete', task.id)">
                    <i class="icon fa-solid fa-trash-can"></i>
                </button>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    methods: {
        changeTaskStatus() {
            this.$emit('changeStatus', this.task.id)
        }
    }
}
</script>

<style scoped>
.test {
    flex-grow: 1;
}
.align-left {
    text-align: left;
}
.icon {
    line-height: 24px;
}
.complete {
    color: green
}
.complete:hover {
    color: green
}
.delete {
    color: tomato;
}
.delete:hover {
    color: tomato;
}
.is-completed {
    text-decoration: line-through;
    color: grey;
}
.btn.disabled, .btn:disabled, fieldset:disabled .btn {
    color: grey;
}
</style>