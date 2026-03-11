from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import Response
from ..services.stego_service import process_stego_encode, process_stego_decode
from ..models.stego_models import StegoResponse
from ..security.rate_limit import check_rate_limit

router = APIRouter(prefix="/stego", tags=["Steganography"])

@router.post("/encode", dependencies=[Depends(check_rate_limit)])
async def encode_route(
    algorithm: str = Form(...),
    message: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        # Prevent huge uploads manually if streaming blocks it differently
        file_bytes = await file.read()
        
        encoded_bytes = process_stego_encode(algorithm, file_bytes, message)
        
        media_type = "image/png" if algorithm.lower() == "image" else "audio/wav"
        filename = "stego_encoded.png" if algorithm.lower() == "image" else "stego_encoded.wav"
        
        return Response(
            content=encoded_bytes,
            media_type=media_type,
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/decode", response_model=StegoResponse, dependencies=[Depends(check_rate_limit)])
async def decode_route(
    algorithm: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        file_bytes = await file.read()
        decoded_message = process_stego_decode(algorithm, file_bytes)
        
        return StegoResponse(success=True, result=decoded_message)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
