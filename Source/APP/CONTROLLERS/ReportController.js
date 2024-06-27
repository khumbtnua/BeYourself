class ReportController {
  report(req, res) {
    res.render("report", {
      layout: "extend",
    });
  }
}

module.exports = new ReportController();
