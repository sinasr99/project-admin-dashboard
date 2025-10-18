import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import SearchBar from "../../../components/SearchBar";
import {useSearchParams} from "react-router-dom";
import Input from "../../../components/Input";
import SelectBox from "../../../components/SelectBox";
import {FaEdit, FaLongArrowAltRight, FaTrash} from "react-icons/fa";
import ScrollHorizontal from "../../../components/ScrollHorizontal";
import {IoTriangle} from "react-icons/io5";
import SwiperWithButtons from "../../../components/SwiperWithButtons";
import Modal from "../../../components/Modal";
import {ProductType, Category} from "../../../components/Product.T";
import InputModal from "../../../components/InputModal";
import {computerAndLaptopValidator, phoneAndTabletValidator} from "../../../validations/productValidation"
import * as yup from "yup"
import InputFile from "../../../components/InputFile";

export const categories: Category[] = ["Laptop", "Computer", "Mobile", "Tablet", "Monitor"]

type ProductSortType = "Default" | "Most Expensive" | "Cheapest"
const productSortItems: ProductSortType[] = ["Default", "Most Expensive", "Cheapest"]

type ProductFilterSellerType = "All" | "Sina Saber" | "Alex Morgan" | "Tyler Rake"
type ProductFilterCategory = Category | "All"

// Product Filters :
const productSellerFilterItems: ProductFilterSellerType[] = ["All", "Sina Saber", "Alex Morgan", "Tyler Rake"]
const productCategoryFilterItems: ProductFilterCategory[] = ["All", "Laptop", "Computer", "Mobile", "Tablet", "Monitor"]

// Products Data :
const products: ProductType[] = [
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop Dell",
        category: "Computer",
        brand: "Dell",
        count: 51,
        ram: 32,
        cpu: "Intel Core i7 10700H",
        storage: 1024,
        price: 750
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
    {
        title: "Laptop ASUS TUF Gaming F15",
        category: "Laptop",
        brand: "ASUS",
        count: 29,
        ram: 16,
        cpu: "Intel Core i5 10400H",
        storage: 512,
        price: 500
    },
]

const Products: FC = () => {
    // Search Props :
    const [query, setQuery] = useSearchParams()
    const [inputSearch, setInputSearch] = useState<string>(query.get("search") || "")
    const notifications = [
        "Laptop Asus TUF Gaming Z690 in only 2",
        "Laptop Asus TUF Gaming Z690 in only 2",
        "Laptop Asus TUF Gaming Z690 in only 2",
        "Laptop Asus TUF Gaming Z690 in only 2",
        "Laptop Asus TUF Gaming Z690 in only 2",
        "Laptop Asus TUF Gaming Z690 in only 2",
        "Laptop Asus TUF Gaming Z690 in only 2",
        "Laptop Asus TUF Gaming Z690 in only 2",
        "Laptop Asus TUF Gaming Z690 in only 2",
        "Laptop Asus TUF Gaming Z690 in only 2",
    ]

    // Product Inputs :
    const [productTitle, setProductTitle] = useState("")
    const [productCategory, setProductCategory] = useState<Category>("Laptop")
    const [productPrice, setProductPrice] = useState("")
    const [productCount, setProductCount] = useState("")
    const [productBrand, setProductBrand] = useState("")
    const [productRam, setProductRam] = useState("")
    const [productStorage, setProductStorage] = useState("")
    const [productCPU, setProductCPU] = useState("")
    const [image, setImage] = useState<File | null>(null)

    // States Modal :
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShowRemoveModal, setIsShowRemoveModal] = useState(false)

    // Product Input Errors :
    const [productTitleErrors, setProductTitleErrors] = useState([])
    const [productPriceErrors, setProductPriceErrors] = useState([])
    const [productCountErrors, setProductCountErrors] = useState([])

    // Product Sort & Filter :
    const [productSort, setProductSort] = useState<ProductSortType>(getDefaultSort())
    const [productSellerFilter, setProductSellerFilter] = useState<ProductFilterSellerType>(getDefaultSellerFilter())
    const [productCategoryFilter, setProductCategoryFilter] = useState<ProductFilterCategory>(getDefaultCategoryFilter())

    // Pagination :
    const [products10, setProducts10] = useState<ProductType[]>([])

    // CurrentProduct :
    const [currentProduct, setCurrentProduct] = useState<ProductType>({
        count: 0,
        category: "Laptop",
        brand: "",
        price: 0,
        cpu: "",
        ram: 0,
        storage: 0,
        title: ""
    })

    const pages = Math.ceil(products.length / 10)
    const [currentPage, setCurrentPage] = useState<number>(getDefaultPage())

    const changePage = (newPage: number) => {
        query.set("page", newPage.toString())
        setQuery(query)
        setCurrentPage(newPage)
    }

    function getProducts10(): ProductType[] {
        const from = (currentPage - 1) * 10
        const to = from + 10
        return products.slice(from, to)
    }

    function getDefaultPage(): number {
        const page = query.get("page") || 1

        if (isNaN(+page)) {
            query.set("page", "1")
            return 1
        }

        return +page
    }

    const search = () => {
        query.set("search", inputSearch)
        query.set("category", productCategoryFilter)
        query.set("seller", productSellerFilter)
        query.set("sort", productSort)
        setQuery(query)
    }

    function getDefaultSort(): ProductSortType {
        const sort = query.get("sort")

        if (productSortItems.find(item => item === sort)) {
            return sort as ProductSortType
        }

        query.set("sort", "Default")
        return "Default"
    }

    function getDefaultSellerFilter(): ProductFilterSellerType {
        const filter = query.get("seller") || ""

        if (productSellerFilterItems.find(item => item === filter)) {
            return filter as ProductFilterSellerType
        }

        query.set("seller", "All")
        return "All"
    }

    function getDefaultCategoryFilter(): ProductFilterCategory {
        const filter = query.get("category") || ""

        if (productCategoryFilterItems.find(item => item === filter)) {
            return filter as ProductFilterCategory
        }

        query.set("category", "All")
        return "All"
    }

    const register = async () => {

    }

    const removeHandler = (product: ProductType) => {


    }

    const editHandler = async (newProduct: ProductType) => {
        try {
            console.log("new product => ", newProduct)
            if (newProduct.category === "Laptop" || newProduct.category === "Computer") {
                await computerAndLaptopValidator.validate(newProduct, {abortEarly: false})
                return
            }
            await phoneAndTabletValidator.validate(newProduct, {abortEarly: false})
        } catch (error) {
            console.log("error => ", error)
            if (error instanceof yup.ValidationError) {
                console.log(error.message)
                error.inner.forEach(err => console.log(err.message))
            }
        }
    }

    const showModal = (event: React.MouseEvent, set: Dispatch<SetStateAction<boolean>>, product: ProductType) => {
        event.stopPropagation()
        setCurrentProduct(product)
        set(true)
    }

    useEffect(() => {
        if (currentPage) {
            setProducts10(getProducts10())
        }
    }, [currentPage])

    return (
        <>
            <Modal type="agree" show={isShowRemoveModal} setShow={setIsShowRemoveModal} agreeFunction={removeHandler}
                   question="Are you sure you want to remove this product ?" yesText="Yes, Remove"
                   noText="No"/>
            <InputModal show={isShowEditModal} setShow={setIsShowEditModal} editFunc={editHandler}
                        yesButtonText="Yes, Edit"
                        noButtonText="No" editType="PRODUCT" item={currentProduct}/>

            <div className="container pt-5 pb-[60px]">
                <SearchBar inputSearch={inputSearch} setInputSearch={setInputSearch} search={search} query={query}
                           setQuery={setQuery} notifications={notifications}/>

                <div
                    className="products px-3 py-5 bg-white dark:bg-zinc-700 rounded-md max-w-[1000px] mx-auto dark:text-white mb-5">
                    <h3 className="procut-title text-shadow font-bold text-center text-2xl"> Products
                        Management</h3>

                    <div className="product-create-wrapper mx-auto">
                        <h5 className="product-create-title text-shadow font-bold text-xl py-4">Add Product
                            Section</h5>

                        <div
                            className="product-input-wrapper w-full md:w-fit mx-auto flex flex-col gap-6 md:grid  grid-cols-[300px_300px] lg:grid-cols-[400px_400px] justify-items-center items-start">

                            <div className="w-full flex flex-col gap-1 h-full">
                                <Input type="normal" placeholder="Enter product title" value={productTitle}
                                       setValue={setProductTitle}
                                       isFullWidth={true}/>
                                <span
                                    className="error text-red-500 dark:text-red-400 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[610px] md:max-w-[400px]">Name error 0 0 00 0 0 0 0 0 0 0 0 0                 00 0 0 0 0 0   0 00 0 0 00 0 0 0  0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0</span>
                            </div>
                            <div className="w-full flex flex-col gap-1 h-full">
                                <Input type="normal" placeholder="Enter product price" value={productPrice}
                                       setValue={setProductPrice}
                                       isFullWidth={true}/>
                                <span
                                    className="error text-red-500 dark:text-red-400 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[610px] md:max-w-[400px]">Name error</span>
                            </div>
                            <div className="w-full flex flex-col gap-1 h-full">
                                <Input type="normal" placeholder="Enter product count" value={productCount}
                                       setValue={setProductCount}
                                       isFullWidth={true}/>
                                <span
                                    className="error text-red-500 dark:text-red-400 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[610px] md:max-w-[400px]">Name error</span>
                            </div>
                            <div className="w-full flex flex-col gap-1 h-full">
                                <Input type="normal" placeholder="Enter product brand" value={productBrand}
                                       setValue={setProductBrand}
                                       isFullWidth={true}/>
                                <span
                                    className="error text-red-500 dark:text-red-400 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[610px] md:max-w-[400px]">Name error</span>
                            </div>
                            <div className="w-full flex flex-col gap-1 h-full">
                                <Input type="normal" placeholder="Enter product ram" value={productRam}
                                       setValue={setProductRam}
                                       isFullWidth={true}/>
                                <span
                                    className="error text-red-500 dark:text-red-400 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[610px] md:max-w-[400px]">Name error</span>
                            </div>
                            <div className="w-full flex flex-col gap-1 h-full">
                                <Input type="normal" placeholder="Enter product storage" value={productStorage}
                                       setValue={setProductStorage}
                                       isFullWidth={true}/>
                                <span
                                    className="error text-red-500 dark:text-red-400 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[610px] md:max-w-[400px]">Name error</span>
                            </div>
                            <div className="w-full flex flex-col gap-1 h-full">
                                <InputFile fileType="image" file={image} setFile={setImage} removePlaceholder="remove image" enterPlaceholder="Enter image"/>
                            </div>
                            {
                                (productCategory === "Laptop" || productCategory === "Computer")
                                    ? <div className="w-full flex flex-col gap-1 h-full">
                                        <Input type="normal" placeholder="Enter product cpu" value={productCPU}
                                               setValue={setProductCPU}
                                               isFullWidth={true}/>
                                        <span
                                            className="error text-red-500 dark:text-red-400 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[610px] md:max-w-[400px]">Name error</span>
                                    </div>
                                    : null
                            }
                            <SelectBox items={categories} defaultItem={productCategory}
                                       setDefaultItem={setProductCategory}
                                       placeholder="Enter product category"/>
                            <button
                                onClick={register}
                                className={`bg-orange-400 cursor-pointer opacity-100 text-white rounded-md col-span-2 w-[200px] h-[35px] flex items-center mx-auto justify-center`}>
                                Add Product
                            </button>
                        </div>

                        <div className="products-management mt-[50px]">
                            <h5 className="product-create-title text-shadow font-bold text-xl py-4">Products
                                Management</h5>

                            <div className="filter-sort-wrapper grid gap-x-4 gap-y-6 justify-items-center sm:justify-items-start
                        grid-cols-[300px] sm:grid-cols-[260px_250px] justify-center items-center">
                        <span className="flex font-bold justify-self-center  items-center gap-4">
                                Sorting Products
                                <FaLongArrowAltRight className="w-7 h-7 rotate-90 sm:rotate-0"/>
                            </span>
                                <SelectBox items={productSortItems} defaultItem={productSort}
                                           setDefaultItem={setProductSort} placeholder="product sorting..."/>
                                <span className="flex font-bold justify-self-center  items-center gap-4">
                                Filtering Products by sellers
                                <FaLongArrowAltRight className="w-7 h-7 rotate-90 sm:rotate-0"/>
                            </span>
                                <SelectBox items={productSellerFilterItems} defaultItem={productSellerFilter}
                                           setDefaultItem={setProductSellerFilter}
                                           placeholder="filtering by sellers..."/>
                                <span className="flex font-bold justify-self-center items-center gap-4">
                               Filtering Products by category
                                <FaLongArrowAltRight className="w-7 h-7 rotate-90 sm:rotate-0"/>
                            </span>
                                <SelectBox items={productCategoryFilterItems} defaultItem={productCategoryFilter}
                                           setDefaultItem={setProductCategoryFilter}
                                           placeholder="filtering by category..."/>
                            </div>

                            <div className="products mt-7 flex flex-col gap-6">
                                {
                                    products10.map((product, index) => (
                                        <div key={index}
                                             className="border-solid border-b-[1px] border-b-black/20 dark:border-white/20 pb-1">
                                            <ScrollHorizontal>
                                                <div
                                                    className="product-item grid gap-x-2 items-center grid-cols-[300px_200px_200px_150px_200px_150px_150px_150px_150px]">
                                                    <div className="relative w-full">
                                                        <img draggable={false}
                                                             className="w-full h-[200px] block object-contain"
                                                             src="/images/products/computer-asus.webp"
                                                             alt="MSI Computer"/>
                                                    </div>
                                                    <div className="relative w-full group">
                                        <span
                                            className="tooltip absolute transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible -top-[60px] right-0 left-0 mx-auto bg-orange-500 text-white rounded-md text-center p-1">Product Title</span>
                                                        <IoTriangle
                                                            className="rotate-180 transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible text-orange-500 absolute -top-[25px] animation-opacity w-5 h-5 right-0 left-0 mx-auto"/>
                                                        <span
                                                            className="product-header-title block px-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-center leading-8 h-8 bg-milky dark:bg-gray-500">{product.title}</span>
                                                    </div>
                                                    <div className="relative w-full group">
                                         <span
                                             className="tooltip absolute transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible -top-[60px] right-0 left-0 mx-auto bg-orange-500 text-white rounded-md text-center p-1">Product Price</span>
                                                        <IoTriangle
                                                            className="rotate-180 transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible text-orange-500 absolute -top-[25px] animation-opacity w-5 h-5 right-0 left-0 mx-auto"/>
                                                        <span
                                                            className="product-header-price block px-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-center leading-8 h-8 bg-milky dark:bg-gray-500">{product.price} T</span>
                                                    </div>
                                                    <div className="relative w-full group">
                                        <span
                                            className="tooltip absolute transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible -top-[60px] right-0 left-0 mx-auto bg-orange-500 text-white rounded-md text-center p-1">Product Brand</span>
                                                        <IoTriangle
                                                            className="rotate-180 transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible text-orange-500 absolute -top-[25px] animation-opacity w-5 h-5 right-0 left-0 mx-auto"/>
                                                        <span
                                                            className="product-header-brand block px-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-center leading-8 h-8 bg-milky dark:bg-gray-500">{product.brand}</span>
                                                    </div>
                                                    {
                                                        (product.category === "Laptop" || productCategory === "Computer")
                                                            ?
                                                            <div className="relative w-full group">
                                        <span
                                            className="tooltip absolute transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible -top-[60px] right-0 left-0 mx-auto bg-orange-500 text-white rounded-md text-center p-1">Product CPU</span>
                                                                <IoTriangle
                                                                    className="rotate-180 transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible text-orange-500 absolute -top-[25px] animation-opacity w-5 h-5 right-0 left-0 mx-auto"/>
                                                                <span
                                                                    className="product-header-cpu block px-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-center leading-8 h-8 bg-milky dark:bg-gray-500">{product.cpu}</span>
                                                            </div> : null
                                                    }
                                                    <div className="relative w-full group">
                                         <span
                                             className="tooltip absolute transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible -top-[60px] right-0 left-0 mx-auto bg-orange-500 text-white rounded-md text-center p-1">Product Ram</span>
                                                        <IoTriangle
                                                            className="rotate-180 transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible text-orange-500 absolute -top-[25px] animation-opacity w-5 h-5 right-0 left-0 mx-auto"/>
                                                        <span
                                                            className="product-header-ram block px-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-center leading-8 h-8 bg-milky dark:bg-gray-500">{product.ram} GB</span>
                                                    </div>
                                                    <div className="relative w-full group">
                                        <span
                                            className="tooltip absolute transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible -top-[60px] right-0 left-0 mx-auto bg-orange-500 text-white rounded-md text-center p-1">Product Category</span>
                                                        <IoTriangle
                                                            className="rotate-180 transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible text-orange-500 absolute -top-[25px] animation-opacity w-5 h-5 right-0 left-0 mx-auto"/>
                                                        <span
                                                            className="product-header-title block px-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-center leading-8 h-8 bg-milky dark:bg-gray-500">{product.category}</span>
                                                    </div>
                                                    <div className="relative w-full group">
                                        <span
                                            className="tooltip absolute transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible -top-[60px] right-0 left-0 mx-auto bg-orange-500 text-white rounded-md text-center p-1">Product Count</span>
                                                        <IoTriangle
                                                            className="rotate-180 transition-all ease-in-out duration-150 opacity-0 invisible group-hover:opacity-100 group-hover:visible text-orange-500 absolute -top-[25px] animation-opacity w-5 h-5 right-0 left-0 mx-auto"/>
                                                        <span
                                                            className="product-header-title block px-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-center leading-8 h-8 bg-milky dark:bg-gray-500">{product.count}</span>
                                                    </div>
                                                    <div
                                                        className="product-buttons flex items-center justify-center gap-3">
                                                        <FaTrash
                                                            onClick={event => showModal(event, setIsShowRemoveModal, product)}
                                                            className="w-5 h-5 text-red-600 cursor-pointer"/>
                                                        <FaEdit
                                                            onClick={event => showModal(event, setIsShowEditModal, product)}
                                                            className="w-5 h-5 cursor-pointer"/>
                                                    </div>
                                                </div>
                                            </ScrollHorizontal>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="pagination mt-3 flex justify-center items-center max-w-[500px] mx-auto">
                                <SwiperWithButtons slides={
                                    Array.from({length: pages})
                                        .map((button, index) => (
                                            <button
                                                onClick={() => changePage(index + 1)}
                                                className="shrink-0 text-sm font-bold bg-orange-500 text-white flex items-center justify-center hover:bg-orange-700 transition-all ease-in-out duration-150 cursor-pointer rounded-full w-9 h-9 ">{index + 1}</button>
                                        ))
                                }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products