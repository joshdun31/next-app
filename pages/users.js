export default function Users(props) {

    return(
        <div>
            <table>
            {
                props.data.data.map((item)=><tr key={item._id}><td >{item.name}</td><td>{item.email}</td></tr>)
            }
            </table>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res= await fetch('http://localhost:3000/api/users')
    const data= await res.json()
    return {
      props: {data:data}, // will be passed to the page component as props
    }
  }