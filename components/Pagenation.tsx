import styled from '@emotion/styled';

interface pageType {
  total: number;
  limit: number;
  page: number;
  setPage: (e: number) => void;
}

function Pagination({ total, limit, page, setPage }: pageType) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill('')
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : false}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 1rem 0;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  /* background: black; */
  border: 1px solid rgb(229, 229, 229);
  color: rgb(75, 75, 75);
  font-size: 1rem;

  &:hover {
    background: rgb(203, 203, 203);
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    border: 1px solid rgb(245, 245, 245);
    color: rgb(213, 213, 213);
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: ${(e) => e['aria-current'] === 'page' && `rgb(203, 203, 203)`};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
