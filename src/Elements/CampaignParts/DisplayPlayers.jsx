const DisplayPlayers = ({setShowPlayers}) => {
    return(
        <div className="flex flex-col">
            <div className="flex flex-row">
            <div>Player1  lv:__ HP:__ AC:__ Init:__</div>
            <button>edit</button>
            <button>del</button>
            </div>
            <button onClick={() => setShowPlayers(false)}>X</button>
        </div>
    )
}


export default DisplayPlayers