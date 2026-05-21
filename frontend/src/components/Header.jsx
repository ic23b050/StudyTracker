function Header({ logout }) {
  return (
    <div className="header">
      <h1>Study Tracker</h1>
      <p>Organize your learning tasks.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Header;
