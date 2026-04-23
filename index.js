const {Client, GatewayIntentBits, PermissionsBitField} = require("discord.js");
const {Collection} = require("@discordjs/collection");
const vdjs = require("@discordjs/voice");
const fs = require("fs");
const cp = require("child_process");
const execPromise = require("util").promisify(cp.exec);
const owner = "916986454104739860";
let lock = false;
let htsvoice = JSON.parse(fs.readFileSync("htsvoice.json") + "");
let locks = {};

const guild_dict_perm = PermissionsBitField.Flags.ManageMessages;

const dict_usable = [
	owner,
	"449314820668260373",
	"449867036558884866",
	"701103000940445696",
	"462845132786630678",
	"815264272497770557",
	"345222158336917504"
];

const URLPattern = /(?<scheme>[a-zA-Z]([a-zA-Z0-9+.-])*):(?<hier_part>\/\/((?<userinfo>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|:)*@)?(?<host>\[(?<ipv6address>(((?<h16_0>([0-9a-fA-F]{1,4})):){6}(?<ls32_0>((?<h16_1>([0-9a-fA-F]{1,4})):(?<h16_2>([0-9a-fA-F]{1,4}))|(?<ipv4address_0>((?<dec_octet_0>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_1>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_2>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_3>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))))))|::((?<h16_3>([0-9a-fA-F]{1,4})):){5}(?<ls32_1>((?<h16_4>([0-9a-fA-F]{1,4})):(?<h16_5>([0-9a-fA-F]{1,4}))|(?<ipv4address_1>((?<dec_octet_4>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_5>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_6>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_7>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))))))|((?<h16_6>([0-9a-fA-F]{1,4})))?::((?<h16_7>([0-9a-fA-F]{1,4})):){4}(?<ls32_2>((?<h16_8>([0-9a-fA-F]{1,4})):(?<h16_9>([0-9a-fA-F]{1,4}))|(?<ipv4address_2>((?<dec_octet_8>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_9>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_10>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_11>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))))))|(((?<h16_10>([0-9a-fA-F]{1,4})):){0,1}(?<h16_11>([0-9a-fA-F]{1,4})))?::((?<h16_12>([0-9a-fA-F]{1,4})):){3}(?<ls32_3>((?<h16_13>([0-9a-fA-F]{1,4})):(?<h16_14>([0-9a-fA-F]{1,4}))|(?<ipv4address_3>((?<dec_octet_12>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_13>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_14>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_15>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))))))|(((?<h16_15>([0-9a-fA-F]{1,4})):){0,2}(?<h16_16>([0-9a-fA-F]{1,4})))?::((?<h16_17>([0-9a-fA-F]{1,4})):){2}(?<ls32_4>((?<h16_18>([0-9a-fA-F]{1,4})):(?<h16_19>([0-9a-fA-F]{1,4}))|(?<ipv4address_4>((?<dec_octet_16>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_17>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_18>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_19>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))))))|(((?<h16_20>([0-9a-fA-F]{1,4})):){0,3}(?<h16_21>([0-9a-fA-F]{1,4})))?::(?<h16_22>([0-9a-fA-F]{1,4})):(?<ls32_5>((?<h16_23>([0-9a-fA-F]{1,4})):(?<h16_24>([0-9a-fA-F]{1,4}))|(?<ipv4address_5>((?<dec_octet_20>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_21>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_22>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_23>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))))))|(((?<h16_25>([0-9a-fA-F]{1,4})):){0,4}(?<h16_26>([0-9a-fA-F]{1,4})))?::(?<ls32_6>((?<h16_27>([0-9a-fA-F]{1,4})):(?<h16_28>([0-9a-fA-F]{1,4}))|(?<ipv4address_6>((?<dec_octet_24>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_25>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_26>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_27>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))))))|(((?<h16_29>([0-9a-fA-F]{1,4})):){0,5}(?<h16_30>([0-9a-fA-F]{1,4})))?::(?<h16_31>([0-9a-fA-F]{1,4}))|(((?<h16_32>([0-9a-fA-F]{1,4})):){0,6}(?<h16_33>([0-9a-fA-F]{1,4})))?::))\]|(?<ipv4address_7>((?<dec_octet_28>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_29>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_30>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\.(?<dec_octet_31>([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))))|(?<reg_name>([a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=])*))(:(?<port>[0-9]*))?(?<path>(?<path_abempty>(\/(?<segment_path_abempty>((?<pchar_segment_path_abempty>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|:|@))*))*)|(?<path_absolute>(\/(?<segment_nz_path_absolute>((?<pchar_segment_nz_path_absolute>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|:|@))+)(\/(?<segment_path_absolute>((?<pchar_segment_path_absolute>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|:|@))*))+?))|(?<path_noscheme>((?<segment_nz_nc_path_noscheme>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|@)(\/(?<segment_path_noscheme>((?<pchar_segment_path_noscheme>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|:|@))*))*))|(?<path_rootless>((?<segment_nz_path_rootless>((?<pchar_segment_nz_path_rootless>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|:|@))+)(\/(?<segment_path_rootless>((?<pchar_segment_path_rootless>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|:|@))*))*))|(?:)))(\?(?<query>((?<pchar_query>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|:|@)|\/|\?)*))?(#(?<fragment>((?<pchar_fragment>[a-zA-Z0-9._~-]|%[0-9a-fA-F]{2}|[!$&'()*+,;=]|:|@)|\/|\?)*))?/g;


const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages]
});

let subscribed = {
};

const dict = {
	"bun": "ばん"
};

client.once("clientReady", async()=>{
	client.user.presence.set({
		activities: [
			{
				name: "with Rika",
				type: 0
			}
		]
	});
	let list = fs.readdirSync(".").filter(x=>x.endsWith(".htsvoice")).map(x=>{
		return {
			name: x.replace(/\.htsvoice$/g, ""),
			value: x.replace(/\.htsvoice$/g, "")
		};
	});
	list.sort();
	await client.application.commands.set([{
		name: "ping",
		description: "反応しますわ！"
	},
	{
		name: "join",
		description: "VCに入りますわ！",
		options: [
		{
			type: 7,
			name: "read-channel",
			description: "読み上げるチャンネルですわよ",
			required: false
		},
		{
			type: 3,
			name: "htsvoice",
			description: "声の設定ですわよ (デフォルトはtohokuですわ)",
			required: false,
			choices: list
		}]
	},
	{
		name: "set-user-voice",
		description: "ユーザーの声を設定しますわ",
		options: [{
			type: 3,
			name: "htsvoice",
			description: "声の設定ですわよ (デフォルトはtohokuですわ)",
			required: false,
			choices: list
		}]
	},
	{
		name: "restart",
		description: "さとこを再起動しますわ。にぃにぃしか使えないコマンドですわよ。"
	},
	{
		name: "add-user-dict",
		description: "ユーザー辞書に追加しますわ。",
		options: [
		{
			type: 3,
			name: "read",
			description: "読みですわよ",
			required: true
		},
		{
			type: 3,
			name: "write",
			description: "書きですわよ",
			required: true
		}
		]
	},
	{
		name: "add-guild-dict",
		description: "サーバー辞書に追加しますわ。",
		options: [
		{
			type: 3,
			name: "read",
			description: "読みですわよ",
			required: true
		},
		{
			type: 3,
			name: "write",
			description: "書きですわよ",
			required: true
		}
		]
	},
	{
		name: "add-dict",
		description: "辞書に追加しますわ。にぃにぃしか使えないコマンドですわよ。",
		options: [
		{
			type: 3,
			name: "read",
			description: "読みですわよ",
			required: true
		},
		{
			type: 3,
			name: "write",
			description: "書きですわよ",
			required: true
		},
		{
			type: 4,
			name: "accent",
			description: "アクセント核ですわよ",
			required: true
		},
		{
			type: 4,
			name: "mora",
			description: "モーラ数ですわよ",
			required: true
		}]
	},
	{
		name: "purge",
		description: "読み上げキューを破壊しますわ。"
	},
	{
		name: "skip",
		description: "読み上げ中のメッセージをスキップしますわ。"
	},
	{
		name: "leave",
		description: "VCから抜けますわ..."
	}]);
	if(fs.existsSync((process.argv[2] ?? "join") + ".json")){
		let obj = {};
		try{
			obj = JSON.parse(fs.readFileSync((process.argv[2] ?? "join") + ".json") + "");
		}catch{}
		/* async function join_vc(interaction, chan, readchan, guild, htsvoice) */
		for(let i of Object.keys(obj)){
			console.log("Joining to read " + i);
			try{
				await join_vc(undefined, await client.channels.fetch(obj[i].vc), await client.channels.fetch(i), await client.guilds.fetch(obj[i].guild), obj[i].htsvoice, "ただいまですわ！");
			}catch{}
		}
		try{
			fs.rmSync((process.argv[2] ?? "join") + ".json");
		}catch{}
	}
	console.log("Ready");

	const step = async () => {
		let d = new Date();
		for(let i of Object.keys(subscribed)){
			if(subscribed[i].queue.filter(x=>x.clock).length == 0 && d.getUTCMinutes() == 0 && d.getUTCSeconds() == 0){
				let h = d.getUTCHours() % 12;
				if(h == 0) h = 12;
				subscribed[i].queue.push({clock: true, count: h});
			}
			if(!subscribed[i].using && subscribed[i].queue.length > 0){
				audiopath = "";
				if(subscribed[i].queue[0].clock){
					const u = require("uuid").v4();
					const wavname = u + ".wav";
					const txtname = u + ".txt";

					fs.writeFileSync(txtname, "file 'clock_start.wav'\n" + "file 'clock_bong.wav'\n".repeat(subscribed[i].queue[0].count));

					await execPromise("ffmpeg -f concat -safe 0 -i " + txtname + " -c copy " + wavname);

					fs.rmSync(txtname);

					audiopath = wavname;
				}else{
					const u = require("uuid").v4();
					const wavname = u + ".wav";
					const txtname = u + ".txt";
					let c = subscribed[i].queue[0].content.split(/([a-zA-Z0-9_\-:\[\]<>,\.'"\n ]+|[^a-zA-Z]+)/g).map(x=>x.replace(/^[ \t]+|[ \t]+$/, "")).filter(x=>x);
					let n = 1;
					let pr = [];
	
					for(let j of c){
						n++;
	
						let p = (async ()=>{
							let out = n.toString().padStart(5, "0") + "-" + wavname;
							let inf = n.toString().padStart(5, "0") + "-" + txtname;
							let f = false;
	
							fs.writeFileSync(inf, j);
	
							if(j.match(/[^a-zA-Z0-9_\-:\[\]<>,\.'"\n ]+/)){
								try{
									await execPromise(`/usr/jtalk/bin/open_jtalk -r 1 -x /usr/jtalk/dic -m ${(subscribed[i].queue[0].htsvoice ?? subscribed[i].htsvoice)}.htsvoice -ow ${out} ${inf}`);
								}catch{
									f = true;
								}
								fs.rmSync(inf);
	
								if(f) return;
	
								try{
									await execPromise(`ffmpeg -i ${out} -af "areverse,atrim=start=0,silenceremove=start_periods=1:start_silence=0:start_threshold=0.02,areverse,atrim=start=0,silenceremove=start_periods=1:start_silence=0:start_threshold=0.02" -ar 48000 -ac 1 2-${out}`);
								}catch{
									f = true;
								}
	
								if(f) return;
	
								fs.renameSync(`2-${out}`, out);
							}else{
								try{
									await execPromise(`/usr/dectalk2/bin/say ${out} ${inf}`);
								}catch{
									f = true;
								}
								fs.rmSync(inf);
	
								if(f) return;
	
								try{
									await execPromise(`ffmpeg -i ${out} -af "areverse,atrim=start=0,silenceremove=start_periods=1:start_silence=0:start_threshold=0.02,areverse,atrim=start=0,silenceremove=start_periods=1:start_silence=0:start_threshold=0.02" -ar 48000 -ac 1 2-${out}`);
								}catch{
									f = true;
								}
								
								if(f) return;
	
								fs.renameSync(`2-${out}`, out);
							}
						})();
						pr.push(p);
					}
	
					await Promise.all(pr);
	
					c = fs.globSync(`*-${wavname}`);
					if(c.length == 0){
						if(subscribed[i].queue[0].msg){
							subscribed[i].queue[0].msg.react("❌");
						}
						subscribed[i].queue.shift();
						continue;
					}
	
					fs.writeFileSync(txtname, c.map(x=>`file '${x}'`).join("\n"));
	
					let f = false;
					try{
						await execPromise(`ffmpeg -safe 0 -f concat -i ${txtname} ${wavname}`);
					}catch{
						f = true;
					}
	
					let arr = fs.globSync(`*-${wavname}`);
					for(let j of arr) fs.rmSync(j);
					fs.rmSync(txtname);
	
					if(f){
						if(subscribed[i].queue[0].msg){
							subscribed[i].queue[0].msg.react("❌");
						}
						subscribed[i].queue.shift();
						continue;
					}

					audiopath = wavname;
				}
				let resource = vdjs.createAudioResource(fs.createReadStream(audiopath), {
					inlineVolume: true
				});
				resource.volume.setVolume(1.0);

				subscribed[i].using = 1;

				subscribed[i].player.once("idle", (oldst, newst)=>{
					fs.rmSync(audiopath);
					subscribed[i].queue.shift();
					subscribed[i].using = 0;
				});

				subscribed[i].player.play(resource);
			}
		}

		setTimeout(step, 10);
	};

	step();
});


async function join_vc(interaction, chan, readchan, guild, htsvoice, defmsg){
	if(Object.keys(subscribed).find(x=>subscribed[x].guild == guild.id)){
		subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == guild.id)].player.stop();
		try{
			subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == guild.id)].connection.destroy();
		}catch{}
		delete subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == guild.id)];
	}
	let conn = vdjs.joinVoiceChannel({
		channelId: chan.id,
		guildId: guild.id,
		adapterCreator: guild.voiceAdapterCreator
	});
	conn.once(vdjs.VoiceConnectionStatus.Ready, async ()=>{
		try{
			await interaction.reply({
				content: "<#" + chan.id + ">に入ったわよ！"
			});
		}catch{}
		if(subscribed[readchan.id]){
			subscribed[readchan.id].htsvoice = htsvoice ?? interaction.options.getString("htsvoice") ?? "tohoku";
			subscribed[readchan.id].connection = conn;
			subscribed[readchan.id].player = vdjs.createAudioPlayer({
				behaviors: {
					maxMissedFrames: Infinity
				}
			});
		}else{
			subscribed[readchan.id] = {
				connection: conn,
				player: vdjs.createAudioPlayer({
					behaviors: {
						maxMissedFrames: Infinity
					}
				}),
				guild: guild.id,
				queue: [],
				htsvoice: htsvoice ?? interaction.options.getString("htsvoice") ?? "tohoku"
			};
		}
		subscribed[readchan.id].vc = chan.id;
		subscribed[readchan.id].connection.subscribe(subscribed[readchan.id].player);
		subscribed[readchan.id].queue.push({content:defmsg ?? "準備完了ですわ！"});
	});
}

client.on("voiceStateUpdate", async(oldst, newst) => {
	if(!newst.member.user.bot){
		if(oldst.channel != newst.channel){
			for(let i of Object.keys(subscribed)){
				if(newst.channel && subscribed[i].vc == newst.channel.id){
					subscribed[i].queue.push({content: (newst.member.nickname ?? newst.member.displayName) + "が参加しましたわ！"});
				}else if(oldst.channel && subscribed[i].vc == oldst.channel.id){
					subscribed[i].queue.push({content: (newst.member.nickname ?? newst.member.displayName) + "が退出しましたわ"});
				}
			}
		}
	}
});

client.on("interactionCreate", async(interaction)=>{
	if(!interaction.isCommand()) return;
	if(interaction.commandName == "ping"){
		await interaction.reply({
			content: "オーホッホッホ！"
		});
	}else if(interaction.commandName == "set-user-voice"){
		htsvoice[interaction.member.user.id] = interaction.options.getString("htsvoice") ?? "tohoku";

		fs.writeFileSync("htsvoice.json", JSON.stringify(htsvoice));

		await interaction.reply({
			content: "声を" + htsvoice[interaction.member.user.id]  + "に変更しましたわ"
		});
	}else if(interaction.commandName == "join"){
		if(interaction.options.getChannel("channel")){
			if(interaction.options.getChannel("channel").isVoiceBased()){
				await join_vc(interaction, interaction.options.getChannel("channel"), (interaction.options.getChannel("read-channel") ?? interaction.channel), interaction.options.getChannel("channel").guild);
			}else{
				await interaction.reply({
					content: "<#" + interaction.options.getChannel("channel").id + ">はVCじゃないですわよ"
				});
			}
		}else{
			let user_chan = interaction.guild.channels.cache.filter(x=>x.type == 2 && x.members.find(x=>x.user.id == interaction.member.user.id));
			if(user_chan.first()){
				await join_vc(interaction, user_chan.first(), (interaction.options.getChannel("read-channel") ?? interaction.channel), user_chan.first().guild);
			}else{
				await interaction.reply({
					content: "チャンネルに入ってませんわよ"
				});
			}
		}
	}else if(interaction.commandName == "purge"){
		let user_chan = interaction.guild.channels.cache.filter(x=>x.type == 2 && x.members.find(x=>x.user.id == interaction.member.user.id));
		if(user_chan.first()){
			if(subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == interaction.guild.id)]){
				subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == interaction.guild.id)].queue = [];
				subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == interaction.guild.id)].player.stop();
				await interaction.reply({
					content: "読み上げキューを破壊しましたわ"
				});
			}else{
				await interaction.reply({
					content: "このギルドでは使われてないのですわ"
				});
			}
		}else{
			await interaction.reply({
				content: "チャンネルに入ってませんわよ"
			});
		}
	}else if(interaction.commandName == "skip"){
		let user_chan = interaction.guild.channels.cache.filter(x=>x.type == 2 && x.members.find(x=>x.user.id == interaction.member.user.id));
		if(user_chan.first()){
			if(subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == interaction.guild.id)]){
				subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == interaction.guild.id)].player.stop();
				await interaction.reply({
					content: "スキップしましたわ"
				});
			}else{
				await interaction.reply({
					content: "このギルドでは使われてないのですわ"
				});
			}
		}else{
			await interaction.reply({
				content: "チャンネルに入ってませんわよ"
			});
		}
	}else if(interaction.commandName == "leave"){
		let user_chan = interaction.guild.channels.cache.filter(x=>x.type == 2 && x.members.find(x=>x.user.id == interaction.member.user.id));
		if(user_chan.first()){
			if(subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == interaction.guild.id)]){
				subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == interaction.guild.id)].player.stop();
				try{
					subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == interaction.guild.id)].connection.destroy();
				}catch{}
				delete subscribed[Object.keys(subscribed).find(x=>subscribed[x].guild == interaction.guild.id)];
				await interaction.reply({
					content: "さよならですわ..."
				});
			}else{
				await interaction.reply({
					content: "このギルドでは使われてないのですわ"
				});
			}
		}else{
			await interaction.reply({
				content: "チャンネルに入ってませんわよ"
			});
		}
	}else if(interaction.commandName == "restart"){
		if(interaction.user.id == owner){
			await interaction.reply({content: "再起動しますわ。"});
			process.exit(0);
		}else{
			await interaction.reply({
				content: "あんたはにーにーじゃないですわ。"
			});
		}
	}else if(interaction.commandName == "add-user-dict" || interaction.commandName == "add-guild-dict"){
		const r = interaction.options.getString("read");
		const w = interaction.options.getString("write");
		let n = interaction.commandName.split("-")[1];
		let j = n == "user" ? "ユーザー" : "サーバー";

		try{
		if(n == "guild" && interaction.member && !interaction.member.permissions.has(guild_dict_perm)){
			await interaction.reply({
				content: j + "辞書を変更する権限(メッセージ管理)がありませんわ。"
			});
			return;
		}
		}catch(e){console.log(e)}

		if(locks["user-" + interaction.user.id]){
			await interaction.reply({
				content: j + "辞書更新中ですわ。"
			});
			return;
		}
		locks[n + "-" + interaction.user.id] = true;

		let dict = {};
		if(fs.existsSync("custom/" + n + "-" + interaction.user.id + ".json")){
			try{
				dict = JSON.parse(fs.readFileSync("custom/" + n + "-" + interaction.user.id + ".json") + "");
			}catch{
				await interaction.reply({
					content: j + "辞書データが破損してますわ。にーにーをお呼びくださいまし！"
				});
				return;
			}
		}

		dict[w] = r;

		fs.writeFileSync("custom/" + n + "-" + interaction.user.id + ".json", JSON.stringify(dict));

		await interaction.reply({
			content: j + "辞書を更新しましたわ。"
		});

		locks["user-" + interaction.user.id] = false;
	}else if(interaction.commandName == "add-dict"){
		if(dict_usable.includes(interaction.user.id)){
			if(lock){
				let msg = await interaction.reply({
					content: "CSVがロックされていますわ。"
				});
				return;
			}
			lock = true;
			const str = interaction.options.getString("write").split("").map(x=>{
				let cp = x.codePointAt(0);
				if((cp >= "a".codePointAt(0) && cp <= "z".codePointAt(0)) || (cp >= "A".codePointAt(0) && cp <= "Z".codePointAt(0))){
					cp += 65248;
				}
				return String.fromCodePoint(cp);
			}).join("");
			if(str.match(/,/) || interaction.options.getString("read").match(/,/)){
				let msg = await interaction.reply({
					content: "読み/書きにカンマは入れられませんわ。"
				});
			}else{
				let msg = await interaction.reply({
					content: "追記中ですわ..."
				});
				let rev = fs.readFileSync("dic/build/custom.csv");
				fs.appendFileSync("dic/build/custom.csv", str + ",,,2500,名詞,固有名詞,一般,*,*,*,*," + interaction.options.getString("read") + "," + interaction.options.getString("read") + "," + interaction.options.getInteger("accent") + "/" + interaction.options.getInteger("mora") + ",*\n");
				await msg.edit({
					content: "生成中ですわ..."
				});
				try{
					cp.execSync("cd dic/build && sudo /usr/lib/mecab/mecab-dict-index -o /usr/jtalk/dic");
					await msg.edit({
						content: "生成に成功しましたわ。"
					});
				}catch{
					await msg.edit({
						content: "生成に失敗しましたわ。revertしますわ。"
					});
					fs.writeFileSync("dic/build/custom.csv", rev);
					cp.execSync("cd dic/build && sudo /usr/lib/mecab/mecab-dict-index -o /usr/jtalk/dic");
					await msg.edit({
						content: "revertしましたわ。"
					});
				}
			}
			lock = false;
		}else{
			await interaction.reply({
				content: "あんたはにーにーじゃないですわ。"
			});
		}
	}
});

function resolveURL(...args){
	const groups = args[args.length - 1];
	return groups["ipv6address"] ? "IPv6アドレス" : (groups["host"] + "へのリンク");
}

function replTemp(members){
	return function(_, type, num){
		if(type == "@"){
			let memb = members.cache.find(x=>x.id==num);
			if(!memb){
				return "不明なユーザー";
			}else{
				return memb.nickname ?? memb.displayName;
			}
		}
	}
}

client.on("messageCreate", async(m)=>{
	if(m.member && m.member.user.id != client.user.id && subscribed[m.channel.id] && !m.content.startsWith("_") && !m.member.user.bot && m.content){
		let cont = m.content.replace(/```[^\n]*\n.*```/gms, "コードブロック省略").replace(/\|\|.+?\|\|/g, "スポイラー").replace(/<([@])([0-9]+)>/g, replTemp(m.guild.members)).replace(/<:([^:]+):[0-9]+>/g, "$1").replace(URLPattern, resolveURL).replace(/\n/g, " ");
		for(let type of ["user", "guild"]){
			let id = type == "user" ? m.member.user.id : m.guild.id;
			if(fs.existsSync("custom/" + type + "-" + id + ".json")){
				let dict = {};
				try{
					dict = JSON.parse(fs.readFileSync("custom/" + type + "-" + id + ".json") + "");
				}catch{
					continue;
				}

				for(let key of Object.keys(dict)){
					cont = cont.replace(new RegExp(require("regexp.escape")(key), "gi"), dict[key]);
				}
			}
		}
		subscribed[m.channel.id].queue.push({content: cont, msg: m, htsvoice: htsvoice[m.member.user.id] ?? "tohoku"});
	}
});

let iskilled = false;

function killed(){
	if(!iskilled){
		let obj = {};
		for(let i of Object.keys(subscribed)){
			obj[i] = {
				guild: subscribed[i].guild,
				htsvoice: subscribed[i].htsvoice,
				vc: subscribed[i].vc
			};
		}
		fs.writeFileSync((process.argv[2] ?? "join") + ".json", JSON.stringify(obj));
		iskilled = true;
		process.exit(0);
	}
}

process.on("exit", killed);
process.on("SIGINT", killed);
process.on("SIGTERM", killed);
process.on("unhandledRejection",(err)=>{
	console.log(err);
});
process.on("uncaughtException",(err)=>{
	console.log(err);
});

console.log("Launching");

client.login(process.env.SATOKO_TOKEN);
//client.login((fs.readFileSync(process.env.TOKEN_FILE ?? "./token") + "").trim());
