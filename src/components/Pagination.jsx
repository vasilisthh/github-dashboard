const Pagination = ({ page, setPage, totalPages }) => {
    return (
        <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setPage(page - 1)}>
                        Previous
                    </button>
                </li>
                <li className="page-item disabled">
                    <span className="page-link">{page} / {totalPages}</span>
                </li>
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setPage(page + 1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
