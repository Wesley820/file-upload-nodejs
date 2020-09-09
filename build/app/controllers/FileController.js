"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class FileController {
  async store(request, response) {
    if (!request.file) {
      return response.status(400).json({ error: 'Image is required' });
    }

    const { originalname: name, size, filename: key, path } = request.file;

    const file = await _File2.default.create({
      name,
      size,
      key,
      url: path,
    });

    return response.status(201).json(file);
  }

  async delete(request, response) {
    const { id } = request.params;
    const file = await _File2.default.findById(id);

    if (!file) return response.send();

    await file.remove();
    return response.send();
  }
}

exports. default = new FileController();
