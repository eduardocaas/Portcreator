import io, pathlib
from PIL import Image

from firebase_functions import storage_fn
from firebase_admin import initialize_app, storage

initialize_app()

@storage_fn.on_object_finalized()
def generate_thumbnail(event: storage_fn.CloudEvent[storage_fn.StorageObjectData]):

  bucket_name = event.data.bucket
  file_path = pathlib.PurePath(event.data.name)
  content_type = event.data.content_type
  
  if not content_type or not content_type.startswith('image/'):
    print(f"[IGNORADO]. Arquivo {file_path} não é uma imagem.")
    return
  
  if file_path.name.startswith('thumb_'):
    print(f"[IGNORADO]. Arquivo {file_path} já é uma thumbnail.")
    return
  
  bucket = storage.bucket(bucket_name)
  image_blob = bucket.blob(str(file_path))
  
  try:
    image_bytes = image_blob.download_as_bytes()
    image = Image.open(io.BytesIO(image_bytes))
    
    size = (220, 220)
    
    image.thumbnail(size=size, resample=Image.Resampling.LANCZOS)
    thumbnail_io = io.BytesIO()
    image.save(thumbnail_io, format='PNG')
    thumbnail_io.seek(0)
    
    thumbnail_path = file_path.parent / pathlib.PurePath(f"thumb_{file_path.stem}.png")
    thumbnail_blob = bucket.blob(str(thumbnail_path))
    thumbnail_blob.upload_from_string(thumbnail_io.getvalue(), content_type="image/png")
    
    print(f"[SUCESSO]. Thumbnail gerada em: 'thumb_{file_path.stem}.png")
    
  except Exception as e:
    print(f"[ERRO]. Falha ao gerar thumbnail para {str(file_path)}. Erro: {e}")