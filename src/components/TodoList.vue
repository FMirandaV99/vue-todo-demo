<template>
    <div class="container">       
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Add new task..." v-model="newTask">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="addNewTask">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>

        <div class="my-4 d-flex">
            <div>
                <button class="mx-2 btn btn-outline-primary" @click="onShowAll">
                    All
                </button>
                <button class="mx-2 btn btn-outline-secondary" @click="onShowPending">
                    Pending
                </button>
                <button class="mx-2 btn btn-outline-success" @click="onShowCompleted">
                    Completed
                </button>
            </div>
            <span class="spacer"></span>
        </div>
        
        <div class="mt-4 card">
            <div class="card-body">
                <template v-if="showAll">
                    <TodoTask v-for="task in tasks" :key="task.id" :task="task" @change-status="changeTaskStatus" @delete="deleteTask" />
                </template>
                
                <template v-else-if="showPending">
                    <TodoTask v-for="task in pendingTasks" :key="task.id" :task="task" @change-status="changeTaskStatus" />
                </template>

                <template v-else >
                    <TodoTask v-for="task in completedTasks" :key="task.id" :task="task" @change-status="changeTaskStatus" />
                </template>
                
                
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    components: {
        TodoTask: defineAsyncComponent( () => import('./TodoTask.vue') )
    },
    data() {
        return {
            tasks: {
                type: Array,
                default: []
            },
            showAll: {
                type: Boolean,
                default: true
            },
            showPending: {
                type: Boolean,
                default: false
            },
            newTask: ''
        }
    },
    created() {
        this.tasks = [
            {
                id: 1,
                title: 'Aprender Vue',
                isCompleted: true
            },
            {
                id: 2,
                title: 'Aprender NodeJS',
                isCompleted: false
            }
        ]
    },
    computed: {
        pendingTasks() { 
            return this.tasks.filter(task => !task.isCompleted)
        },
        completedTasks() {
            return this.tasks.filter(task => task.isCompleted)
        }
    },
    methods: {
        changeTaskStatus( id ) {
            const task = this.tasks.find( t => t.id === id )

            if (task.isCompleted) {
                task.isCompleted = false
            } else {
                task.isCompleted = true
            }

        },
        addNewTask() {

            const { id } = this.tasks.at(-1);

            this.tasks.push({
                id: id + 1,
                title: this.newTask,
                isCompleted: false
            })

            this.newTask = ''

            
        },
        deleteTask( id ) {
            this.tasks = this.tasks.filter(t => t.id !== id)
        },
        onShowAll() {
            this.showAll = true
            this.showPending = false
        },
        onShowPending() {
            this.showAll = false
            this.showPending = true
        },
        onShowCompleted() {
            this.showAll = false
            this.showPending = false
        }
    }
}
</script>

<style scoped>

.input-group input {
    border-right: none;
}

.input-group .btn-outline-secondary {
    border: 1px solid #ced4da;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.spacer {
    flex-grow: 1;
}
</style>