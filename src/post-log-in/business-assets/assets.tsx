import {postPic, getBusPic, deleteBusPic} from '../../util/storage-func';
// eslint-disable-next-line no-unused-vars
import {Business} from '../../util/business';
import Form from 'react-bootstrap/Form';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {postBusiness} from '../../util/api-functions';
import './assets.css';


interface AssetsProps {
  uid: string;
  setBusiness: (b: Business) => void;
  business: Business | undefined | null;
}

const AssetsPage = ({uid, setBusiness, business} : AssetsProps) => {
  const [file, setFile] = useState<File| null>(null);
  const [images, setImages] = useState<[string, string][]>([]);
  const [progress, setProgress] = useState<number>(-1);

  useEffect(() => {
    loadImages();
  }, []);

  /**
   *
   */
  async function loadImages() {
    const imagePathList = business!.locations[0].images;
    const imageList : [string, string][] = [];
    for (let i = 0; i < imagePathList.length; i ++) {
      const path = imagePathList[i];
      await getBusPic(uid, path, (url:string) => {
        if (url !== '') {
          imageList.push([path, url]);
        }
      });
    }
    setImages(imageList);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        postPic(file, true, undefined, setProgress, (url: string) => {
          if (url !== '') {
            if (!business!.locations[0].images.includes(file.name)) {
              business!.locations[0].images.push(file.name);
              setImages([...images, [file.name, url]]);
              postBusiness(business!);
            }
            setBusiness(business!);
          }
        });
      }
    }
    const form = document.getElementById('form') as HTMLFormElement;
    form.reset();
  };

  const getFile = (id: string) => {
    const doc = document.getElementById(id) as HTMLInputElement;
    if (doc) {
      const files = doc.files;
      setFile(files![0]);
    }
  };

  const displayImages = () => {
    return (
      <div id='img-holder'>
        {
          images.map((img:[string, string], idx: number) => (
            <div id={img[0]} key={idx} className='img-info'>
              <p>
                {img[0]}
                <Button
                  variant='primary'
                  size="sm"
                  onClick={() => moveToFirst(img[0])}
                >
                  Set as Background
                </Button>
                <Button
                  variant='danger'
                  size="sm"
                  onClick={() => deleteImage(img[0])}
                >
                  Delete
                </Button>
              </p>
              <img src={img[1]} alt={img[0]} key={idx} className='img-asset'/>
            </div>
          ))
        }
      </div>
    );
  };

  const moveToFirst = (imgId:string) => {
    const businessImage = business!.locations[0].images;
    const index = businessImage.indexOf(imgId);
    if (index > 0) {
      const oldfirst = businessImage[0];
      businessImage[0] = businessImage[index];
      businessImage[index] = oldfirst;

      const oldImages = images.slice();
      const oldpair = oldImages[0];
      oldImages[0] = oldImages[index];
      oldImages[index] = oldpair;
      setImages(oldImages);
      postBusiness(business!);
    }
    setBusiness(business!);
  };

  const deleteImage = (imgId:string) => {
    deleteBusPic(uid, imgId);

    const index = business!.locations[0].images.indexOf(imgId);
    if (index > -1) {
      business!.locations[0].images.splice(index, 1);
      const imagelist = images.slice();
      imagelist.splice(index, 1);
      setImages(imagelist);
      postBusiness(business!);
    }
    setBusiness(business!);
  };

  const appPreview = () => {
    // const background = (images[0])? images[0][1] : 'red';
    return (
      <div id='appview-holder'>
        <div id='app-feed-wrapper'>
          <p>Feed View of your business:</p>
          <div
            id='app-feed'
            style={{background: (images[0])?
              'url(' + images[0][1] + ')': 'red'}}>
            <p style={{fontWeight: 'bold'}}>{business!.type}</p>
            <h1 style={{fontWeight: 'bold', fontSize: 40}}>{business!.name}</h1>
          </div>
        </div>

        <div id='app-business-view'>
        </div>

      </div>
    );
  };

  return (
    <div id='assets-page'>
      <h1>Your Images:</h1>
      {displayImages()}
      <Form id='form' noValidate onSubmit={submitForm}>
        <Form.Group>
          <Form.File
            name="file"
            label="File"
            onChange={ (e : any) =>getFile('imageInput')}
            // isInvalid={!!errors.file}
            // feedback={errors.file}
            id="imageInput"
            // feedbackTooltip
          />
        </Form.Group>
        <Button
          type="submit"
          variant='primary'
        >
          Post Image
        </Button>
      </Form>
      {appPreview()}
      <div id='progress-bar-container'>
        {(progress >= 0) ? <ProgressBar now={progress} /> : <div/>}
      </div>
    </div>

  );
};

export default AssetsPage;
