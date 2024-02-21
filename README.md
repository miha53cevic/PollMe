# PollMe
Using NextJS 13 with AppRouting

## References
- [SWR revalidation interval](https://swr.vercel.app/docs/revalidation)
- [Iron-Session usage](https://github.com/vvo/iron-session?tab=readme-ov-file#usage)
- [SWRMutate](https://medium.com/@jayashakthiperera/power-of-swr-with-react-useswrmutation-61a0aa82d958)

The main advantage of this useSWRMutation hook is, all the useSWR hooks with the same key will be re-validated automatically as a side effect. For example, let’s assume there is a component using useSWR with the key /todo to render the Todo list. And using useSWRMutation with the key /todo to add a new Todo item.