import { PagingProps } from "./props";

const Paging: React.FC<PagingProps> = (props:PagingProps) => {
var t = parseInt("1");
  var totalPage = Math.floor(props.total / props.pageSize);
  if(props.total % props.pageSize != 0) {
	totalPage++;
  }	

  var firstPage:Number[] = []; 
  if(props.currentPage - 3 > 1) {
	firstPage.push(1)
  }

  var firstSpit:Number[] = []; 
  if(props.currentPage - 4 > 1) {
	firstSpit.push(1)
  }

  var previousPages:Number[] = [];
  for(var l = props.currentPage -3;l< props.currentPage;l++) {
	if(l >0) {
		previousPages.push(l);
	}
  }
 
  var nextPages:Number[] = [];
  for(var l = props.currentPage +1;l<= props.currentPage + 3;l++) {
	if(l <= totalPage) {
		nextPages.push(l);
	}
  }
  var lastSpit:Number[] = []; 
  if(props.currentPage + 4 < totalPage) {
	lastSpit.push(totalPage)
  }

  var lastPage:Number[] = []; 
  if(props.currentPage + 3 < totalPage) {
	lastPage.push(totalPage)
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
		<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
		
			<div>
				<nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
					<a href={`${props.url + "1"}`} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
						<span className="sr-only">Previous</span>
						<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"></path>
						</svg>
					</a>
					{/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
				
				{firstPage.map((record: any) => (
					<a key={record} href={`${props.url + record}`} className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">{record}</a>
				))}
				{firstSpit.map((record: any) => (
					<span key={record} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
				))}
				{previousPages.map((record: any) => (
       				<a key={record} href={`${props.url + record}`} className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">{record}</a>
      			))}
				<span aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{props.currentPage}</span>
				{nextPages.map((record: any) => (
       				<a key={record} href={`${props.url + record}`} className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">{record}</a>
      			))}
				{lastSpit.map((record: any) => (
					<span key={record} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
				))}
				{lastPage.map((record: any) => (
					<a key={record} href={`${props.url + record}`} className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">{record}</a>
				))}
				<a href={`${props.url + totalPage}`} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
						<span className="sr-only">Next</span>
						<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"></path>
						</svg>
				</a>
				</nav>
			</div>
		</div>
	</div>
  )
}

export default Paging;