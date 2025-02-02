  $response = file_get_contents(
            "https://www.google.com/recaptcha/api/siteverify?secret=" . env('GOOGLE_RECAPTCHA_SECRETKEY') . "&response=" . $request['g-recaptcha-response'] . "&remoteip=" . $_SERVER['REMOTE_ADDR']
        );
        $response = json_decode($response);
        if ($response->success === false) {
            if(isset($response->score) && $response->score <= 0.4) {
                //dd('spam detected'.$response->score);
                Alert::error('Error', 'Failed to validate Google Recaptcha, Please try again!');
            }
            Alert::error('Error', 'Failed to validate Google Recaptcha, Please try again!');
            return redirect()->route('index');
        }

landbooking controller
