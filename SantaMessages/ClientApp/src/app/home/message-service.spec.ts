import { TestBed } from '@angular/core/testing';
import { MessageService } from './message-service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('MessageService', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MessageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle 100 requests', () => {
    
    let status = true;
    
    for (let i = 0; i < 100; i++) {
      let resp_text = "";
      service.sendMessage("message" + i).subscribe(
        (response: any) => {
          resp_text = response.body.status;
          expect(response.status).toBe(200);
        }
      );

      const httpRequest = httpTestingController.expectOne('/message');
      expect(httpRequest.request.method).toBe('POST');
      httpRequest.flush(resp_text);
    }
    expect(status).toBe(true);
  });
});
