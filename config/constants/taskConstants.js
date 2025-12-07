module.exports = {
    respMsg: {
        created: (elem) => `${elem} created successfully`,
        updated: (elem) => `${elem} updated successfully`,
        deleted: (elem) => `${elem} deleted successfully`,
        notDeleted: (elem) => `${elem} not deleted`,
        complete: (elem) => `${elem} status changed`,
        getAll: (elem) => `List of all ${elem}`,
        notFound: (elem) => `${elem} not found`,
        WENT_WRONG: "Something went wrong",
        REQUIRED: "Some required fields are missing",
        INVALID_ID: "ID is invalid",
        INVALID_STATUS: "Status is not valid",
        INVALID_PRIORITY: "Priority is not valid",
        INVALID_DATE: "Invalid date format"
    }
}

