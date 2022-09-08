const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    const data = await service.list()
    const parsed = data.map(({ runtime_in_minutes, ...data}) => {
        return { runtime_in_minutes: Number(runtime_in_minutes), ...data }
    })
    res.json({data: parsed})
}

async function listNowShowing(req, res) {
    const data = await service.listNowShowing()
    const parsed = data.map(({ runtime_in_minutes, ...data }) => {
        return { runtime_in_minutes: Number(runtime_in_minutes), ...data }
    })
    res.json({data: parsed})
}

module.exports = {
    list: asyncErrorBoundary(list),
    listNowShowing: asyncErrorBoundary(listNowShowing)
}