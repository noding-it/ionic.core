# Services

## LoadingService
### Usage

```
import { LoadingService } from '@myvirtualab.angular/core';

loading: boolean = false
...
constructor(
 private loadingservice: LoadingService
){
   this.subscription = this.loadingService.loadingChanged.subscribe(
        (isLoading: boolean) => {
            this.loading = isLoading
        }
    )
}
...
```
