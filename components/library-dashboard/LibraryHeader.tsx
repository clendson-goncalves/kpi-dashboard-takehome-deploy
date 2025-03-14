"use client"

import { Button } from "@/components/ui/button"
import { Search, PackagePlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/data/mockData"

/**
 * Props interface for the LibraryHeader component
 * @interface LibraryHeaderProps
 * @property {string} searchQuery - Current search query value
 * @property {string} selectedCategory - Currently selected category ID
 * @property {function} onSearchChange - Callback function when search query changes
 * @property {function} onCategoryChange - Callback function when category selection changes
 */
interface LibraryHeaderProps {
    searchQuery: string
    selectedCategory: string
    onSearchChange: (query: string) => void
    onCategoryChange: (category: string) => void
}

/**
 * Header component for the library dashboard with search and category filtering
 * @param {LibraryHeaderProps} props - Component props
 * @returns {JSX.Element} Rendered header component
 */
export default function LibraryHeader({ 
    searchQuery, 
    selectedCategory, 
    onSearchChange, 
    onCategoryChange 
}: LibraryHeaderProps) {
    return (
        <>
            <div className="flex justify-end max-w-[1280px] mx-auto px-4 py-2" >
                <Button
                    variant="outline"
                    size="sm"
                    className="h-10 w-28 gap-2 bg-slate-500 text-white
                     hover:bg-slate-700 hover:text-white border-0 rounded-md"
                >
                    <PackagePlus className="h-4 w-4" />
                    Request
                </Button>
            </div>

            <div className="mx-auto max-w-[768px]">
                <div className="mb-12">
                    <h1 className="text-5xl font-extrabold mx-auto py-2 text-center space-y-5">Library</h1>
                    <p className="text-slate-700 text-center">Browse for assets needed to report and present analysis.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 px-8 mb-6">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                        <Input
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10 bg-white w-full rounded-lg border-0 outline-none focus:ring-0 focus-visible:ring-0"
                        />
                    </div>
                    
                    <Select value={selectedCategory} onValueChange={onCategoryChange}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-white rounded-lg border-0 outline-none focus:ring-0 focus-visible:ring-0">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    )
}