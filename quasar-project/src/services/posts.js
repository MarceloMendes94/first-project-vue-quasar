import useApi from 'src/composables/UseApi'
export default function postsService () {
const { post, update, remove, list, getById } = useApi('posts')
return {
    post,
    update,
    remove,
    list,
    getById
    }
}
