import '../../assets/styles/cards/usersCard.css'

export default function UserCard({user}:any) {
    console.log(user)
  return (
    <div className="container user-card">

      <div className="header">
        <h3>{user.firstName}  {user.lastName}</h3>
       
        <span >{user.role.name}</span>
      </div>

      <div className="extra-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>State/UT:</strong> {user.district.stateorUt.stateorUtName}</p>
        <p><strong>District:</strong>{user.district.name}</p>
        <p><strong>Phone Number:</strong>{user.phoneNumber}</p>
      </div>

      <div className="button-box">
        <button className="button broadcast-button">Promote</button>
        <button className="button delete-button">Delete</button>
      </div>

    </div>
  );
}