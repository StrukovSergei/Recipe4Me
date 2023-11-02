const RecipeModal = () => {
    return (
        <>
            <div className="overlay"></div>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Recipe title</h2>
                        <span className="close-btn">&times;</span>
                    </div>
                    <p>Recipe summary</p>
                </div>
            </div>
        </>
    )
}

export default RecipeModal