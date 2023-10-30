import * as api from './api'
import { FormEvent, useState } from "react"

import "./App.css"
import { Recipe } from './types'

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const recipes = await api.searchRecipes(searchTerm, 1)
      setRecipes(recipes.results)

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <form onSubmit={(event) => handleSearchSubmit(event)}>
        <input type='text' required placeholder='Enter a search term ...' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
        <button>submit</button>
      </form>
      {recipes.map((recipe) => (
        <div>
          image {recipe.image}
          title {recipe.title}
        </div>
      ))}
    </div>
  )
}

export default App