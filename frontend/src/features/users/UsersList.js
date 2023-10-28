import {useGetUsersQuery} from "./usersApiSlice"
import User from './User'

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    console.log('Users:', users); // Log the users data
    console.log('Loading:', isLoading); // Log the loading state
    console.log('Success:', isSuccess); // Log the success state
    console.log('Error:', isError); // Log the error state
    console.log('Error message:', error?.data?.message); // Log the error message

    let content 
    if (isLoading) content = <p> Loading...</p>
    if (isError) content = <p className="errmsg">{error?.data?.message}</p>
    if (isSuccess) {
        const ids = Object.keys(users)
        const tableContent = ids?.length
        ? ids.map(userId => <User key = {userId} userId={userId}/>)
        :null
        content = (
            <table className="table table--users">
            <thead className="table__thead">
            <tr>
                <th scope="col" className="table__th user__username"> Username</th>
                <th scope="col" className="table__th user__roles"> Roles </th>
                <th scope="col" className="table__th user__edit"> Edit </th>
            </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
            </table>
        )
    }
    return content
}
export default UsersList
