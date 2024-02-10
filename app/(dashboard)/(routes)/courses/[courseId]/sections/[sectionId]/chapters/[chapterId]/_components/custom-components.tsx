import { cn } from "@/lib/utils";
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';


interface CommonProps {
    children: React.ReactNode;
}

const MyElement: React.FC<CommonProps> = ({ children, ...props }) => (
    <div {...props}>{children}</div>
);

const MyTable: React.FC<CommonProps> = ({ children, ...props }) => (
    <table {...props}>{children}</table>
);

const MyTableHead: React.FC<CommonProps> = ({ children, ...props }) => (
    <thead {...props}>{children}</thead>
);

const MyTableBody: React.FC<CommonProps> = ({ children, ...props }) => (
    <tbody {...props}>{children}</tbody>
);

const MyTableRow: React.FC<CommonProps> = ({ children, ...props }) => (
    <tr {...props}>{children}</tr>
);

const MyTableData: React.FC<CommonProps> = ({ children, ...props }) => {
    let txtclss;
    if (children?.toString() === "Easy") {
        txtclss = "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-700 p-2 rounded-xl";
    } else if (children?.toString() === "Medium") {
        txtclss = "text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-700 p-2 rounded-xl";
    } else if (children?.toString() === "Hard") {
        txtclss = "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-700 p-2 rounded-xl";
    }
    return (
        <td {...props}><span className={`${txtclss}`}>
            {children}</span></td>)
};

const MyTableHeader: React.FC<CommonProps> = ({ children, ...props }) => (
    <th {...props}>{children}</th>
);

const MyHeading1: React.FC<CommonProps> = ({ children, ...props }) => (
    <h1 {...props}>{children}</h1>
);

const MyHeading2: React.FC<CommonProps> = ({ children, ...props }) => (
    <h2 {...props}>{children}</h2>
);

const MyHeading3: React.FC<CommonProps> = ({ children, ...props }) => (
    <h3 {...props}>{children}</h3>
);

const MyHeading4: React.FC<CommonProps> = ({ children, ...props }) => (
    <h4 {...props}>{children}</h4>
);

const MyHeading5: React.FC<CommonProps> = ({ children, ...props }) => (
    <h5 {...props}>{children}</h5>
);

const MyHeading6: React.FC<CommonProps> = ({ children, ...props }) => (
    <h6 {...props}>{children}</h6>
);

const MyParagraph: React.FC<CommonProps> = ({ children, ...props }) => (
    <p {...props}>{children}</p>
);

const MyEmphasis: React.FC<CommonProps> = ({ children, ...props }) => (
    <em {...props}>{children}</em>
);

const MyStrong: React.FC<CommonProps> = ({ children, ...props }) => (
    <strong {...props}>{children}</strong>
);

const MyDelete: React.FC<CommonProps> = ({ children, ...props }) => (
    <del {...props}>{children}</del>
);

const MyLink: React.FC<CommonProps> = ({ children, ...props }) => (
    <a {...props} target="_blank">
        {children}
    </a>
);

const MyList: React.FC<CommonProps> = ({ children, ...props }) => (
    <ul {...props}>{children}</ul>
);

const MyOrderedList: React.FC<CommonProps> = ({ children, ...props }) => (
    <ol {...props}>{children}</ol>
);

const MyListItem: React.FC<CommonProps> = ({ children, ...props }) => (
    <li {...props}>{children}</li>
);

const MyBlockQuote: React.FC<CommonProps> = ({ children, ...props }) => (
    <blockquote {...props}>{children}</blockquote>
);


const MyCode: React.FC<CommonProps> = ({ children, ...props }) => (
    <pre {...props}>{children}</pre>
);

const MyHorizontalRule: React.FC<CommonProps> = ({ children, ...props }) => (
    <hr {...props}>{children}</hr>
);

export const overrides = {
    h1({children, className, node, ...rest}:any){
        return <MyHeading1 {...rest} className={cn('text-4xl font-bold text-black mt-5 mb-2',className)}>{children}</MyHeading1>
    },
    h2({children, className, node, ...rest}:any){
        return <MyHeading2 {...rest} className={cn('text-3xl font-bold text-black mt-5 mb-2',className)}>{children}</MyHeading2>
    },
    h3({children, className, node, ...rest}:any){
        return <MyHeading3 {...rest} className={cn('text-2xl font-bold text-black mt-5 mb-2',className)}>{children}</MyHeading3>
    },
    h4({children, className, node, ...rest}:any){
        return <MyHeading4 {...rest} className={cn('text-xl font-bold text-black mt-5 mb-2',className)}>{children}</MyHeading4>
    },
    h5({children, className, node, ...rest}:any){
        return <MyHeading5 {...rest} className={cn('text-lg font-bold text-black mt-5 mb-2',className)}>{children}</MyHeading5>
    },
    h6({children, className, node, ...rest}:any){
        return <MyHeading6 {...rest} className={cn('text-base font-bold text-black mt-5 mb-2',className)}>{children}</MyHeading6>
    },
    ul({children, className, node, ...rest}:any){
        return <MyList {...rest} className={cn('marker:text-black list-disc list-inside mt-1 mb-4',className)}>{children}</MyList>
    },
    ol({children, className, node, ...rest}:any){
        return <MyOrderedList {...rest} className={cn('list-decimal list-inside marker:text-black  mt-1 mb-4 ',className)}>{children}</MyOrderedList>
    },
    li({children, className, node, ...rest}:any){
        return <MyListItem {...rest} className={cn('font-sans text-md font-medium',className)}>{children}</MyListItem>
    },
    p({children, className, node, ...rest}:any){
        return <MyParagraph {...rest} className={cn('font-sans font-medium text-md mb-1 prevent-select',className)}>{children}</MyParagraph>
    },
    em({children, className, node, ...rest}:any){
        return <MyEmphasis {...rest} className={cn('',className)}>{children}</MyEmphasis>
    },
    strong({children, className, node, ...rest}:any){
        return <MyStrong {...rest} className={cn(' font-semibold prevent-select',className)}>{children}</MyStrong>
    },
    del({children, className, node, ...rest}:any){
        return <MyDelete {...rest} className={cn('',className)}>{children}</MyDelete>
    },
    a({children, className, node, ...rest}:any){
        return <MyLink {...rest} className={cn('text-[#9aa4e7] hover:text-[#a591ee] font-semibold',className)}>{children}</MyLink>
    },
    blockquote({children, className, node, ...rest}:any){
        return <MyBlockQuote {...rest} className={cn('border-l-4 border-gray-400 dark:border-gray-600 italic my-8 pl-8',className)}>{children}</MyBlockQuote>
    },
    code({children, className, node, ...rest}:any){
        return <MyCode {...rest} className={cn('cd ',className)}>{children}</MyCode>
    },
    table({children, className, node, ...rest}:any){
        return <MyTable {...rest} className={cn('table-fixed w-full mt-6 mb-10 rounded-xl',className)}>{children}</MyTable>
    },
    thead({children, className, node, ...rest}:any){
        return <MyTableHead {...rest} className={cn('bg-gray-200 dark:bg-gray-700 rounded-tl-xl',className)}>{children}</MyTableHead>
    },
    tbody({children, className, node, ...rest}:any){
        return <MyTableBody {...rest} className={cn('divide-y divide-gray-200 dark:divide-gray-700',className)}>{children}</MyTableBody>
    },
    tr({children, className, node, ...rest}:any){
        return <MyTableRow {...rest} className={cn(' ',className)}>{children}</MyTableRow>
    },
    td({children, className, node, ...rest}:any){
        return <MyTableData {...rest} className={cn('px-6 py-4 align-top whitespace-normal text-sm font-medium text-gray-800 dark:text-gray-200',className)}>{children}</MyTableData>
    },
    th({children, className, node, ...rest}:any){
        return <MyTableHeader {...rest} className={cn('px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase',className)}>{children}</MyTableHeader>
    },
    hr({children, className, node, ...rest}:any){
        return <MyHorizontalRule {...rest} className={cn('my-8',className)}>{children}</MyHorizontalRule>
    },
    math: ({ value }) => <BlockMath>{value}</BlockMath>,
    inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
};