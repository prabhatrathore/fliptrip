
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Avatar_11, Avatar_09, Avatar_02, Avatar_10, Avatar_05, Avatar_08 } from "../../Entryfile/imagepath"
import EditLead from "../../_components/modelbox/EditLead"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../paginationfunction"
import "../antdstyle.css"
import { useDispatch, useSelector } from 'react-redux';
import { getAllAgents, getAllEmployees, returnAllEmployees } from '../../redux/features/employee/employeeSlice';
import { getEmployess } from '../../Services/user.service';
import Select from 'react-select';
import { toastError, toastSuccess } from '../../utils/toastUtils';
import { createLead } from '../../Services/lead.service';

const Leads = () => {
  const employees = useSelector(getAllAgents)
  const [agentsArr, setAgentsArr] = useState([]);
  const dispatch = useDispatch()



  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [agentId, setAgentId] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [priority, setPriority] = useState("");


  const [data, setData] = useState([
    {
      id: 1, image: Avatar_02, name: "John Doe", Leadid: "TKT-0001", Leadsubject: "Internet Issue",
      createddate: "5 Jan 2019 07:21 AM", lastreply: "5 Jan 2019 11.12 AM	", priority: "High", status: "New"
    }
  ]);
  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
  });


  const handleGetAllEmployees = async () => {
    try {
      let { data: res } = await getEmployess()
      if (res.success) {
        console.log(res, "res")
        dispatch(returnAllEmployees(res.data))
      }
    } catch (error) {
      console.error(error)
      toastError(error)
    }
  }





  useEffect(() => {
    if (employees && employees.length > 0) {
      let tempArr = employees.map((el) => {
        let obj = {
          label: `${el.firstName} ${el.lastName}`,
          value: el._id,
        }
        return obj
      })
      setAgentsArr([...tempArr])
    }
  }, [employees])


  useEffect(() => {
    handleGetAllEmployees()
  }, [])





  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      // console.log('Error: ', error)
    };
  };
  const handleFileSelection = (event) => {
    if (event.target.files[0]) {
      getBase64(event.target.files[0], (result) => {
        console.log(result, "result")
        setFileUrl(result);
      });
    }
  };




  const handleSubmitLead = async (e) => {
    e.preventDefault()
    try {

      if (subject == "") {
        toastError("Subject cannot be empty");
        return
      }
      if (`${phone}` == "") {
        toastError("Phone cannot be empty");
        return
      }
      if (`${phone}`.length != 10) {
        toastError("Phone must be 10 digits long");
        return
      }
      if (`${agentId}` == "") {
        toastError("Agent cannot be empty");
        return
      }
      if (`${description}` == "") {
        toastError("Description cannot be empty");
        return
      }
      let obj = {
        subject,
        phone,
        agentId,
        description,
        fileUrl,
        priority,
      }
      let { data: res } = await createLead(obj);
      if (res.success) {
        toastSuccess(res.message)
      }
    }
    catch (err) {
      toastError(err)
      console.error(err)
    }
  }



  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: 'Lead Id',
      dataIndex: 'Leadid',
      render: (text, record) => (
        <Link onClick={() => localStorage.setItem("minheight", "true")} to="/app/employees/Lead-view">#TKT-0001</Link>
      ),
      sorter: (a, b) => a.Leadid.length - b.Leadid.length,
    },
    {
      title: 'Assigned Staff',
      dataIndex: 'name',
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image} /></Link>
          <Link to="/app/profile/employee-profile">{text}</Link>
        </h2>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Created Date',
      dataIndex: 'createddate',
      sorter: (a, b) => a.createddate.length - b.createddate.length,
    },

    {
      title: 'Last Reply',
      dataIndex: 'lastreply',
      sorter: (a, b) => a.lastreply.length - b.lastreply.length,
    },
    {
      title: 'Priority',
      render: (text, record) => (
        <div className="dropdown action-label">
          <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-dot-circle-o text-danger" /> High </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> High</a>
            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-warning" /> Medium</a>
            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Low</a>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <div className="dropdown action-label text-center">
          <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-dot-circle-o text-danger" /> New
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-info" /> Open</a>
            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-info" /> Reopened</a>
            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> On Hold</a>
            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Closed</a>
            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> In Progress</a>
            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Cancelled</a>
          </div>
        </div>
      ),
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div className="dropdown dropdown-action text-end">
          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_Lead"><i className="fa fa-pencil m-r-5" /> Edit</a>
            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_Lead"><i className="fa fa-trash-o m-r-5" /> Delete</a>
          </div>
        </div>
      ),
    },

  ]



  const handlePriorityChange = (e) => {
    setPriority(e.value)
  }


  const handleAgentChange = (e) => {
    setAgentId(e.value)
  }

  const options = [
    {
      label: "High",
      value: "High"
    },
    {
      label: "Medium",
      value: "Medium"
    },
    {
      label: "Low",
      value: "Low"
    },
  ]



  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Leads - CRM created by Ebslon Infotech</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Leads</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Leads</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_Lead"><i className="fa fa-plus" /> Add Lead</a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="card-group m-b-30">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">New Leads</span>
                    </div>
                    <div>
                      <span className="text-success">+10%</span>
                    </div>
                  </div>
                  <h3 className="mb-3">112</h3>
                  <div className="progress mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Solved Leads</span>
                    </div>
                    <div>
                      <span className="text-success">+12.5%</span>
                    </div>
                  </div>
                  <h3 className="mb-3">70</h3>
                  <div className="progress mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Open Leads</span>
                    </div>
                    <div>
                      <span className="text-danger">-2.8%</span>
                    </div>
                  </div>
                  <h3 className="mb-3">100</h3>
                  <div className="progress mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Pending Leads</span>
                    </div>
                    <div>
                      <span className="text-danger">-75%</span>
                    </div>
                  </div>
                  <h3 className="mb-3">125</h3>
                  <div className="progress mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Employee Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option> -- Select -- </option>
                <option> Pending </option>
                <option> Approved </option>
                <option> Returned </option>
              </select>
              <label className="focus-label">Status</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option> -- Select -- </option>
                <option> High </option>
                <option> Low </option>
                <option> Medium </option>
              </select>
              <label className="focus-label">Priority</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <div>
                <input className="form-control floating datetimepicker" type="date" />
              </div>
              <label className="focus-label">From</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <div>
                <input className="form-control floating datetimepicker" type="date" />
              </div>
              <label className="focus-label">To</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <a href="#" className="btn btn-success btn-block w-100"> Search </a>
          </div>
        </div>
        {/* /Search Filter */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">

              <Table className="table-striped"
                pagination={{
                  total: data.length,
                  showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: 'auto' }}
                columns={columns}
                // bordered
                dataSource={data}
                rowKey={record => record.id}
                onChange={console.log("change")}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Lead Modal */}
      <div id="add_Lead" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Lead</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Lead Subject</label>
                      <input value={subject} onChange={(e) => setSubject(e.target.value)} className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} type={"tel"} maxLength={10} className="form-control" />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Client</label>
                      <select className="select">
                        <option>-</option>
                        <option>Delta Infotech</option>
                        <option>International Software Inc</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Priority</label>
                      <Select
                        onChange={handlePriorityChange}
                        options={options}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label>Assign Staff {agentsArr.length}</label>
                        <Select
                          onChange={handleAgentChange}
                          options={agentsArr}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Upload Files</label>
                      <input onChange={(e) => handleFileSelection(e)} className="form-control" type="file" />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button onClick={(e) => handleSubmitLead(e)} className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Lead Modal */}
      {/* Edit Lead Modal */}
      <EditLead />
      {/* /Edit Lead Modal */}
      {/* Delete Lead Modal */}
      <div className="modal custom-modal fade" id="delete_Lead" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Lead</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">Delete</a>
                  </div>
                  <div className="col-6">
                    <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Lead Modal */}
    </div>
  );
}

export default Leads;
