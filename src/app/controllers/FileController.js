import File from '../models/File';

class FileController {
  async store(request, response) {
    if (!request.file) {
      return response.status(400).json({ error: 'Image is required' });
    }

    const { originalname: name, size, filename: key, path } = request.file;

    const file = await File.create({
      name,
      size,
      key,
      url: path,
    });

    return response.status(201).json(file);
  }

  async delete(request, response) {
    const { id } = request.params;
    const file = await File.findById(id);

    if (!file) return response.send();

    await file.remove();
    return response.send();
  }
}

export default new FileController();
