import * as dao from "./dao.js";

function ModuleRoutes(app) {
  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      id: new Date().getTime().toString(),
    };
    const created = await dao.createModule(newModule);
    res.send(created);
  });

  app.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    const module = req.body;
    const status = await dao.updateModule(mid, module);
    const updated = await dao.findModuleById(mid);
    res.json(status);
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    const status = await dao.deleteModule(mid);
    res.json(status);
  });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const modules = await dao.findModuleByCourseId(cid);
    res.send(modules);
  });
}

export default ModuleRoutes;
