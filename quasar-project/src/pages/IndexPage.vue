<template>
  <q-page padding>
    <q-table
      title="Artigos"
      :rows=posts
      :columns=columns
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h5"> Artigos </span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{ name: 'formPost'}" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm" >
          <q-btn icon="edit" color="info" dense size="md" @click="handleEditPost(props.row.id)"/>
          <q-btn icon="delete" color="negative" dense size="md" @click="handleDeletePost(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list, remove } = postsService()
    const columns = [
      { name: 'id', field: 'id', label: 'Id', sortable: true, align: 'left' },
      { name: 'title', field: 'title', label: 'Titulo', sortable: true, align: 'left' },
      { name: 'author', field: 'author', label: 'Autor', sortable: true, align: 'left' },
      { name: 'content', field: 'content', label: 'Conteudo', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'ações', align: 'right' }
    ]
    const $q = useQuasar()
    const route = useRouter()
    onMounted(() => {
      getPosts()
    })
    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        console.log(error)
      }
    }
    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
        title: 'Deletar elemento',
        message: 'Deseja remover esse post',
        cancel: true,
        persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com sucesso', icon: 'check', color: 'positive' })
          await getPosts()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao apagar', icon: 'times', color: 'negative' })
      }
    }
    const handleEditPost = (id) => {
      route.push({ name: 'formPost', params: { id } })
    }
    return {
      posts,
      columns,
      handleDeletePost,
      handleEditPost
    }
  }
})
</script>
