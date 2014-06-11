# trival fix report for pkgsrc bulk builds

This tool uses regexes to identify possible trivial fixing opportunities in pkgsrc bulk build reports. 

## install

	npm install -g trivialfix

## mirror reports from pkgsrc-bulk:

	wget -r --level=1 http://us-east.manta.joyent.com/pkgsrc/public/reports/upstream-trunk64/20140604.0931/meta/report.html
	
## generate report

	trivialfix logs/ > report.html
	
## /!\ warning

The regexes used by this tool might provide false positives. Some packages might not be trivial to fix but still listed. There might be better fixes than the proposed ones. Other error and portability fixes might still be needed in addition to the proposed ones. Apply common sense. Pull requests for better patterns welcome.
