# 1 key https
openssl genrsa -out key.pem 
penssl req -new -key key.pem -out csr.pem
penssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem


video
 - 	id
 - 	id_file
	--- dir Map ++ { dirFile: "file-video -- ex: "fileVideo" }
	cách tổ chức dirFile
	apiCandy/sub-id/fileVideo
		/ id video Gồm tệp về video + cover-picture
 - 	id_comments mỗi sản phẩm = 1 
	-- id_user of video
	-- video_review type Map 
		ex {
		  "6395f2a262d4e837aa4bc52b" of one video
			 { 
				id_product: "6395f2a262d4e837aa4bc52b", id video				
				comment: 
					{
	--  note: ex Not map and cap no @... ? # ... ? ...
	-- @
	-- reply type MAP {
		from ""
		note: ... ?
		@
		reply : {..max more-2} 
	}
					}

			 }
		} 
 - 	id_status
	only_view : "" | "" | ""
	access_user: ["comments","Duet",Stitch];
	