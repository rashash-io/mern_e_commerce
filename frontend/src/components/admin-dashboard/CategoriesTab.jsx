import CreateCategoryForm from "./CreateCategoryForm"


import {CategoriesList }from "./CategoriesList"
import { useEffect } from "react"
import { useCategoryStore } from "../../stores"


export const CategoriesTab = () => {
const {fetchAllCategories} = useCategoryStore()
  
 useEffect(()=>{fetchAllCategories()},[])
  return(
    <>
    <div className="flex  items-center justify-between gap-4   h-[75vh]">
    <CategoriesList />
    <CreateCategoryForm />
    </div>

    </>
  )

}

export default CategoriesTab


