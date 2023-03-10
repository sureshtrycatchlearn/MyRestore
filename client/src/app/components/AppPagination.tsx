import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface props{
    metaData: MetaData;
    onPageChange: (page:number)=>void;
}

export default function AppPagination({metaData, onPageChange}:props){
  const {currentPage, totalPages, totalCount, pageSize} = metaData;
    return(
        <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography>
          Display {(currentPage-1)*pageSize+1}-
                  {currentPage * pageSize > totalCount 
                  ? totalCount
                  :currentPage*pageSize} of {totalCount} Items
        </Typography>
        <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(e, page)=>onPageChange(page)}
        />
      </Box>
    )
}