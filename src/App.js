import { Row, Col, Card, Form } from 'react-bootstrap';
import Table from "react-bootstrap-table-next";
import Pagination from "react-bootstrap-table2-paginator";
import * as Paginator from "react-bootstrap-table2-paginator";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { entries } from "./data";

const App = () => {

  const columns = [
    { dataField: "id", text: "ID", hidden: true },
    { dataField: "name", text: "Name", sort: true},
    { dataField: "position", text: "Position", sort: true},
    { dataField: "office", text: "Office", sort: true },
    { dataField: "age", text: "Age", sort: true },
    { dataField: "startDate", text: "Start date", sort: true },
    { dataField: "salary", text: "Salary", formatter: (cell) => <span>${cell}</span> },
    { dataField: "action", text: "Actions", cell:() => <button onClick="" >Actions</button>, button: true}
  ];
  
  const customTotal = (from, to, size) => (
    <div>
      Showing {from} to {to} of {size} entries
    </div>
  );
  
  const customSizePerPage = (props) => {
    const { options, currentSizePerPage, onSizePerPageChange } = props;
  
    const onPageChange = (e) => {
      const page = e.target.value;
      onSizePerPageChange(page);
    }
  
    return (
      <Row>
        <Col xs="auto">
          <Form.Select value={currentSizePerPage} onChange={onPageChange} className="pe-5">
            {options.map(o => (
              <option key={o.page} value={o.page}>
                {o.text}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          entries per page
        </Col>
      </Row>
    );
  };
  
  return(
    <div className='px-5 py-5'>
      <ToolkitProvider
        keyField="id"
        search={true}
        columns={columns}
        data={entries}
        wrapperClasses="table-responsive"
      >
        {({ baseProps, searchProps }) => (
          <Paginator.PaginationProvider pagination={
            Pagination({
              custom: true,
              showTotal: true,
              alwaysShowAllBtns: true,
              totalSize: entries.length,
              paginationTotalRenderer: customTotal,
              sizePerPageRenderer: customSizePerPage
            })
          }>
            {({ paginationProps, paginationTableProps }) => (
              <Card>
                <div className="table-responsive py-2">
                  <Card.Header>
                    <Row>
                      <Col xs={12} md={6} className="py-1">
                        <Paginator.SizePerPageDropdownStandalone {...paginationProps} />
                      </Col>
                      <Col xs={12} md={6} className="d-flex justify-content-md-end py-1">
                        <Search.SearchBar {...searchProps} />
                      </Col>
                    </Row>
                  </Card.Header>
    
                  <Table 
                    {...baseProps} 
                    {...paginationTableProps} 
                    bodyClasses="border-1" 
                    rowClasses="border-bottom"
                    classes="table-bordered dataTable-table table-striped"
                  />
    
                  <Card.Footer>
                    <Row>
                      <Col xs={12} md={6} className="d-flex align-items-center py-1">
                        <Paginator.PaginationTotalStandalone {...paginationProps} />
                      </Col>
                      <Col xs={12} md={6} className="d-flex justify-content-md-end align-items-center mb-0 py-1">
                        <Paginator.PaginationListStandalone {...paginationProps} />
                      </Col>
                    </Row>
                  </Card.Footer>
                </div>
              </Card>
            )}
          </Paginator.PaginationProvider>
        )}
      </ToolkitProvider>
    </div>
  );
}

export default App;
